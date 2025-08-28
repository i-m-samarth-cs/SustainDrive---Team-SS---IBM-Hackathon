import cv2
import numpy as np
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import matplotlib.pyplot as plt
import tkinter as tk
from tkinter import filedialog

class VehicleAnalyzer:
    def __init__(self):
        # Initialize advanced models for smoke and damage detection
        self.smoke_model = self._initialize_smoke_model()
        self.damage_model = self._initialize_damage_model()

        # Image transformation
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])

    def _initialize_smoke_model(self):
        """Initialize an advanced model for smoke detection"""
        model = models.efficientnet_b4(pretrained=True)
        model.classifier = nn.Sequential(
            nn.Dropout(0.3),
            nn.Linear(model.classifier[1].in_features, 1)
        )
        return model

    def _initialize_damage_model(self):
        """Initialize a model for vehicle damage detection"""
        model = models.resnet50(pretrained=True)
        model.fc = nn.Sequential(
            nn.Linear(model.fc.in_features, 512),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(512, 1)  # Binary classification for damage
        )
        return model

    def select_image(self):
        """Open a file dialog to select an image"""
        root = tk.Tk()
        root.withdraw()  # Hide the main window
        
        # Open file dialog
        file_path = filedialog.askopenfilename(
            title="Select Vehicle Image",
            filetypes=[
                ("Image files", "*.jpg *.jpeg *.png *.bmp *.gif"),
                ("JPEG files", "*.jpg *.jpeg"),
                ("PNG files", "*.png"),
                ("Bitmap files", "*.bmp"),
                ("GIF files", "*.gif")
            ]
        )
        
        return file_path if file_path else None

    def detect_smoke_and_analyze(self, image_path):
        """
        Advanced analysis of smoke and vehicle damage

        Args:
            image_path (str): Path to the input image

        Returns:
            dict: Comprehensive analysis results
        """
        # Read image
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image at {image_path}")

        # Detect smoke and damage
        smoke_score = self._calculate_smoke_percentage(image)
        damage_score = self._detect_vehicle_damage(image)

        # Annotate image with detection results
        annotated_image = self._annotate_image(image, smoke_score, damage_score)

        # Generate detailed analysis
        analysis = self._generate_comprehensive_analysis(smoke_score, damage_score)

        return {
            'annotated_image': annotated_image,
            'smoke_percentage': smoke_score * 100,
            'damage_detected': damage_score > 0.5,
            'analysis': analysis
        }

    def _calculate_smoke_percentage(self, image):
        """Enhanced smoke percentage calculation"""
        # Convert BGR to RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(image_rgb)

        # Prepare image for model
        input_tensor = self.transform(pil_image).unsqueeze(0)

        # Get smoke detection score with multiple passes
        with torch.no_grad():
            # Multiple forward passes for more accurate detection
            smoke_scores = []
            for _ in range(5):
                output = self.smoke_model(input_tensor)
                smoke_scores.append(torch.sigmoid(output).item())

            # Use average of multiple detections
            smoke_score = np.mean(smoke_scores)

        return smoke_score

    def _detect_vehicle_damage(self, image):
        """Detect potential vehicle damage"""
        # Convert BGR to RGB
        image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(image_rgb)

        # Prepare image for model
        input_tensor = self.transform(pil_image).unsqueeze(0)

        # Get damage detection score
        with torch.no_grad():
            # Multiple forward passes for more accurate detection
            damage_scores = []
            for _ in range(5):
                output = self.damage_model(input_tensor)
                damage_scores.append(torch.sigmoid(output).item())

            # Use average of multiple detections
            damage_score = np.mean(damage_scores)

        return damage_score

    def _annotate_image(self, image, smoke_score, damage_score):
        """Annotate image with detailed detection results"""
        height, width = image.shape[:2]

        # Fixed colors for smoke and damage text
        smoke_color = (0, 0, 255) if smoke_score <= 0.5 else (0, 0, 255)
        damage_color = (0, 0, 255) if damage_score > 0.5 else (0, 0, 255)

        # Fixed text properties
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale = 1  # Fixed font size
        thickness = 2  # Thickness of the text

        # Define static positions for text (adjust as needed)
        smoke_text_position = (10, 30)  # Top-left corner for smoke text
        damage_text_position = (10, 70)  # Positioned below the smoke text

        # Add text annotations with fixed font size
        texts = [
            f"Smoke: {smoke_score*100:.1f}%",
            f"Damage: {'Yes' if damage_score > 0.5 else 'No'}"
        ]

        # Draw the smoke text
        cv2.putText(image, texts[0], smoke_text_position, font, font_scale, smoke_color, thickness)

        # Draw the damage text
        cv2.putText(image, texts[1], damage_text_position, font, font_scale, damage_color, thickness)

        return image

    def _generate_comprehensive_analysis(self, smoke_score, damage_score):
        """Generate detailed analysis with smoke and damage insights"""
        # Smoke severity classification
        smoke_severity = (
            'Critical' if smoke_score > 0.8 else
            'High' if smoke_score > 0.6 else
            'Moderate' if smoke_score > 0.4 else
            'Low'
        )

        # Damage assessment
        damage_status = 'Yes' if damage_score > 0.5 else 'No'

        # Comprehensive analysis
        analysis = {
            'smoke': {
                'severity': smoke_severity,
                'potential_causes': self._get_smoke_causes(smoke_severity),
                'prevention_tips': self._get_prevention_tips(smoke_severity)
            },
            'damage': {
                'detected': damage_status,
                'recommendations': self._get_damage_recommendations(damage_status)
            }
        }

        return analysis

    def _get_smoke_causes(self, severity):
        """Get potential smoke causes based on severity"""
        causes = {
            'Critical': [
                'Severe engine damage',
                'Major exhaust system failure',
                'Potentially catastrophic engine issues'
            ],
            'High': [
                'Significant engine wear',
                'Clogged air filters',
                'Fuel system problems'
            ],
            'Moderate': [
                'Minor engine performance issues',
                'Need for tune-up'
            ],
            'Low': [
                'Normal engine performance',
                'No significant concerns'
            ]
        }
        return causes.get(severity, [])

    def _get_prevention_tips(self, severity):
        """Get prevention tips based on smoke severity"""
        tips = {
            'Critical': [
                'Immediate professional inspection',
                'Cease driving immediately'
            ],
            'High': [
                'Comprehensive engine check',
                'Replace air and fuel filters'
            ],
            'Moderate': [
                'Regular maintenance',
                'Schedule diagnostic test'
            ],
            'Low': [
                'Continue regular maintenance',
                'Annual vehicle check-up'
            ]
        }
        return tips.get(severity, [])

    def _get_damage_recommendations(self, damage_status):
        """Get recommendations based on damage detection"""
        recommendations = {
            'Yes': [
                'Immediate professional inspection',
                'Comprehensive damage assessment',
                'Potential repair or replacement needed'
            ],
            'No': [
                'No immediate action required',
                'Continue regular maintenance'
            ]
        }
        return recommendations.get(damage_status, [])

    def run_analysis(self):
        """Main method to run the vehicle analysis"""
        # Prompt user to upload an image
        image_path = self.select_image()

        if not image_path:
            print("No image selected. Exiting.")
            return

        try:
            # Analyze the selected image
            result = self.detect_smoke_and_analyze(image_path)

            # Display analysis results
            self._display_analysis(result)

        except Exception as e:
            print(f"Error analyzing image: {e}")

    def _display_analysis(self, result):
        """Display analysis results with matplotlib"""
        # Create a figure with two subplots
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

        # Text analysis on the left
        ax1.text(0, 1, "VEHICLE ANALYSIS REPORT", fontsize=14, fontweight='bold')
        ax1.text(0, 0.95, "=" * 50, fontsize=10)

        # Smoke Analysis
        ax1.text(0, 0.90, "\nSMOKE ANALYSIS", fontsize=12, fontweight='bold')
        ax1.text(0, 0.85, "-" * 50, fontsize=10)
        ax1.text(0, 0.80, f"Smoke Percentage:     {result['smoke_percentage']:.1f}%", fontsize=10)
        ax1.text(0, 0.75, f"Smoke Severity:       {result['analysis']['smoke']['severity']}", fontsize=10)

        # Potential Causes
        ax1.text(0, 0.70, "\nPotential Causes:", fontsize=11, fontweight='bold')
        for i, cause in enumerate(result['analysis']['smoke']['potential_causes']):
            ax1.text(0, 0.65 - i*0.05, f"• {cause}", fontsize=10)

        # Prevention Tips
        y_offset = 0.65 - len(result['analysis']['smoke']['potential_causes'])*0.05
        ax1.text(0, y_offset - 0.05, "\nPrevention Tips:", fontsize=11, fontweight='bold')
        for i, tip in enumerate(result['analysis']['smoke']['prevention_tips']):
            ax1.text(0, y_offset - 0.1 - i*0.05, f"• {tip}", fontsize=10)

        # Damage Analysis
        y_offset = y_offset - 0.1 - len(result['analysis']['smoke']['prevention_tips'])*0.05
        ax1.text(0, y_offset - 0.05, "\nDAMAGE ANALYSIS", fontsize=12, fontweight='bold')
        ax1.text(0, y_offset - 0.1, "-" * 50, fontsize=10)
        ax1.text(0, y_offset - 0.15, f"Damage Detected:      {result['damage_detected']}", fontsize=10)

        # Recommendations
        ax1.text(0, y_offset - 0.2, "\nRecommendations:", fontsize=11, fontweight='bold')
        for i, rec in enumerate(result['analysis']['damage']['recommendations']):
            ax1.text(0, y_offset - 0.25 - i*0.05, f"• {rec}", fontsize=10)

        ax1.axis('off')

        # Annotated Image on the right
        ax2.imshow(cv2.cvtColor(result['annotated_image'], cv2.COLOR_BGR2RGB))
        ax2.axis('off')

        plt.tight_layout()
        plt.show()

def main():
    """Main entry point of the application"""
    analyzer = VehicleAnalyzer()
    analyzer.run_analysis()

if __name__ == "__main__":
    main()