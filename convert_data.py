#!/usr/bin/env python3
"""
Convert CSV data files to JSON format for the Ford Strategy Dashboard
"""

import csv
import json
import os

# Paths
DATA_SOURCE = "/home/kh0pp/DSCI-5330/assignment-06-take-2/data"
DATA_OUTPUT = "/home/kh0pp/DSCI-5330/ford-strategy-dashboard/public/data"

def read_csv(filename):
    """Read CSV file and return list of dicts"""
    filepath = os.path.join(DATA_SOURCE, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)

def convert_kpis():
    """Convert comprehensive_kpi_dashboard.csv to structured JSON"""
    data = read_csv("comprehensive_kpi_dashboard.csv")

    # Group by category
    grouped = {
        "financial": [],
        "marketing": [],
        "management": [],
        "operations": [],
        "quality": [],
        "sustainability": []
    }

    for row in data:
        category = row["KPI_Category"].lower()
        kpi = {
            "metric": row["Metric"],
            "ford_overall": row["Ford_Overall_2024"],
            "ford_blue": row["Ford_Blue_2024"],
            "model_e": row["Ford_Model_e_2024"],
            "ford_pro": row["Ford_Pro_2024"],
            "benchmark": row["Industry_Benchmark"],
            "performance_vs_benchmark": row["Performance_vs_Benchmark"],
            "trend": row["Trend_2023_2024"]
        }
        if category in grouped:
            grouped[category].append(kpi)

    return grouped

def convert_frameworks():
    """Convert strategic_framework_application_matrix.csv to JSON"""
    data = read_csv("strategic_framework_application_matrix.csv")

    frameworks = []
    for row in data:
        framework = {
            "id": row["Framework"].lower().replace(" ", "-").replace("&", "and").replace("(", "").replace(")", ""),
            "name": row["Framework"],
            "source": row["Source"],
            "area": row["Application_Area"],
            "applications": {
                "blue": row["Ford_Blue_Application"],
                "modelE": row["Ford_Model_e_Application"],
                "pro": row["Ford_Pro_Application"]
            },
            "assessment": row["Overall_Assessment"]
        }
        frameworks.append(framework)

    return frameworks

def convert_timeline():
    """Convert ford_transformation_timeline_2020_2025.csv to JSON"""
    data = read_csv("ford_transformation_timeline_2020_2025.csv")

    timeline = []
    for row in data:
        entry = {
            "year": row["Year"],
            "financial": row["Financial_Milestone"],
            "marketing": row["Marketing_Milestone"],
            "management": row["Management_Milestone"],
            "operations": row["Operations_Milestone"],
            "framework": row["Framework_Applied"]
        }
        timeline.append(entry)

    return timeline

def convert_business_units():
    """Convert business_unit_multidimensional_performance.csv to JSON"""
    data = read_csv("business_unit_multidimensional_performance.csv")

    units = {}
    for row in data:
        unit_key = row["Business_Unit"].lower().replace(" ", "_").replace("ford_", "")
        if "model" in unit_key:
            unit_key = "model_e"
        elif "pro" in unit_key:
            unit_key = "pro"
        else:
            unit_key = "blue"

        units[unit_key] = {
            "name": row["Business_Unit"],
            "financial": row["Financial_Performance"],
            "marketing": row["Marketing_Performance"],
            "management": row["Management_Characteristics"],
            "operations": row["Operations_Characteristics"],
            "strategic_position": row["Strategic_Position"],
            "framework_fit_score": row["Framework_Fit_Score"]
        }

    return units

def extract_class_readings():
    """Extract relevant course reading summaries from PDF_SUMMARIES.json"""
    summaries_path = "/home/kh0pp/DSCI-5330/assignment-06-take-2/class-notes/PDF_SUMMARIES.json"

    with open(summaries_path, 'r', encoding='utf-8') as f:
        full_data = json.load(f)

    # Extract key frameworks we're using
    key_topics = [
        "Data Visualization",
        "Consumer Behavior",
        "Marketing Intelligence",
        "Management Model",
        "Time Value",
        "HR Analytics",
        "Artificial Intelligence",
        "Strategy"
    ]

    readings = []
    for doc in full_data:
        summary = doc.get("summary", "")
        # Check if this document relates to our key topics
        if any(topic.lower() in summary.lower() for topic in key_topics):
            readings.append({
                "filename": doc.get("filename", ""),
                "summary": summary[:2000] + "..." if len(summary) > 2000 else summary
            })

    return readings

def main():
    """Main conversion function"""
    os.makedirs(DATA_OUTPUT, exist_ok=True)

    # Convert each data file
    print("Converting KPIs...")
    kpis = convert_kpis()
    with open(os.path.join(DATA_OUTPUT, "kpis.json"), 'w') as f:
        json.dump(kpis, f, indent=2)

    print("Converting frameworks...")
    frameworks = convert_frameworks()
    with open(os.path.join(DATA_OUTPUT, "frameworks.json"), 'w') as f:
        json.dump(frameworks, f, indent=2)

    print("Converting timeline...")
    timeline = convert_timeline()
    with open(os.path.join(DATA_OUTPUT, "timeline.json"), 'w') as f:
        json.dump(timeline, f, indent=2)

    print("Converting business units...")
    units = convert_business_units()
    with open(os.path.join(DATA_OUTPUT, "business_units.json"), 'w') as f:
        json.dump(units, f, indent=2)

    print("Extracting class readings...")
    try:
        readings = extract_class_readings()
        with open(os.path.join(DATA_OUTPUT, "class_readings.json"), 'w') as f:
            json.dump(readings, f, indent=2)
    except Exception as e:
        print(f"Warning: Could not extract class readings: {e}")

    print(f"\nData conversion complete! Files written to {DATA_OUTPUT}")
    for filename in os.listdir(DATA_OUTPUT):
        filepath = os.path.join(DATA_OUTPUT, filename)
        size = os.path.getsize(filepath)
        print(f"  - {filename}: {size:,} bytes")

if __name__ == "__main__":
    main()
