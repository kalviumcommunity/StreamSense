<p align="center">
  <h1 align="center">StreamSense</h1>
  <p align="center"><em>Viewer Engagement Analytics for Content Retention</em></p>
  <p align="center">
    <img src="https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white" />
    <img src="https://img.shields.io/badge/Power_BI-Dashboard-F2C811?style=for-the-badge&logo=powerbi&logoColor=black" />
    <img src="https://img.shields.io/badge/Pandas-Analysis-150458?style=for-the-badge&logo=pandas&logoColor=white" />
    <img src="https://img.shields.io/badge/Scikit--Learn-ML-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" />
    <img src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" />
  </p>
</p>

---

## Overview

**StreamSense** is a data analytics and business intelligence platform purpose-built for subscription-based streaming services. It transforms raw viewer engagement data into actionable intelligence that empowers content acquisition teams to make confident, evidence-based decisions.

Rather than relying on intuition when evaluating which titles to renew, acquire, or discontinue, StreamSense systematically analyzes engagement patterns, models subscriber retention behavior, and produces content investment recommendations grounded in measurable performance metrics.

---

## Problem Statement

Streaming platforms generate millions of user interaction events daily — watch durations, completion rates, pause frequencies, skip counts, and more. Despite the volume of this data, most acquisition teams lack a structured framework for determining *which* behavioral signals actually drive subscriber retention.

**StreamSense bridges that gap.** By surfacing the relationships between viewer behavior and renewal decisions, it equips teams with the visibility needed to act strategically.

---

## Objectives

- Analyze viewer engagement behavior across content types and demographics
- Measure and benchmark content performance using standardized KPIs
- Identify the key engagement factors influencing subscriber retention
- Predict subscription renewal likelihood and flag churn risk
- Categorize content titles into actionable acquisition recommendations
- Deliver an interactive, executive-ready business intelligence dashboard

---

## Architecture

```
              Raw Dataset
                   │
                   ▼
        Data Cleaning (Python)
                   │
                   ▼
         Feature Engineering
                   │
                   ▼
     Exploratory Data Analysis
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
Power BI Dashboard     Machine Learning
       │                       │
       └───────────┬───────────┘
                   ▼
     Business Recommendations
```

---

## Project Structure

```
StreamSense/
│
├── data/
│   ├── raw/                  # Source data files
│   ├── cleaned/              # Post-cleaning datasets
│   └── processed/            # Feature-engineered datasets
│
├── notebooks/
│   ├── 01_data_cleaning.ipynb
│   ├── 02_feature_engineering.ipynb
│   ├── 03_eda.ipynb
│   └── 04_ml_model.ipynb
│
├── dashboard/
│   ├── StreamSense.pbix
│   └── dashboard_images/
│
├── reports/
│   ├── Business_Report.pdf
│   └── Insights.pdf
│
├── src/
│   ├── preprocessing.py
│   ├── features.py
│   ├── visualization.py
│   └── model.py
│
├── requirements.txt
├── README.md
└── LICENSE
```

---

## Dataset

Each record represents a single user viewing session with the following attributes:

| Column | Type | Description |
|---|---|---|
| `User_ID` | String | Unique subscriber identifier |
| `Subscription_Type` | Categorical | Basic or Premium tier |
| `Age_Group` | Categorical | User age bracket |
| `Country` | String | Subscriber geographic location |
| `Content_ID` | String | Unique movie or series identifier |
| `Genre` | Categorical | Content genre classification |
| `Watch_Duration` | Integer | Minutes watched in the session |
| `Total_Duration` | Integer | Total minutes of content available |
| `Completion_%` | Float | Percentage of content consumed |
| `Pause_Count` | Integer | Number of pauses during the session |
| `Rewind_Count` | Integer | Number of rewind events |
| `Skip_Count` | Integer | Number of skipped scenes |
| `Session_Time` | Datetime | Timestamp of the viewing session |
| `Episodes_Watched` | Integer | Episodes consumed in a single session |
| `Binge_Session` | Boolean | Whether session qualifies as a binge |
| `Rating_Given` | Float | User-submitted content rating |
| `Subscription_Length` | Integer | Total months as a subscriber |
| `Renewal` | Boolean | Target — whether subscription was renewed |
| `Churn` | Boolean | Whether the subscriber churned |

---

## Data Processing Pipeline

### 1. Data Cleaning

- Removal of duplicate records
- Imputation or removal of missing values
- Standardization of date and timestamp formats
- Filtering of invalid or out-of-range watch durations
- Validation of all numerical columns against expected bounds

### 2. Feature Engineering

New derived features are constructed to improve model and dashboard expressiveness:

**Completion Percentage**
```
Completion % = (Watch Duration / Total Duration) × 100
```

**Engagement Score**
```
Engagement Score =  0.4 × Completion %
                  + 0.3 × (Watch Duration / Max Duration)
                  + 0.2 × Rating
                  − 0.1 × Pause Frequency
```

**Additional Engineered Features**

| Feature | Description |
|---|---|
| `Binge_Indicator` | Binary flag for sessions with 3+ episodes |
| `Weekend_Viewing` | Flag for sessions on Saturday or Sunday |
| `Prime_Time_Viewing` | Flag for sessions between 18:00 and 23:00 |
| `Watch_Time_Category` | Bucketed watch duration (Short / Medium / Long) |
| `Session_Length` | Derived session length in minutes |
| `High_Engagement_Flag` | Binary flag for Engagement Score above threshold |

---

## Exploratory Data Analysis

The EDA phase investigates the following business questions:

- Which genres consistently deliver the highest viewer engagement?
- Which titles achieve the highest episode completion rates?
- Does pause frequency serve as a reliable churn signal?
- Which age groups exhibit the highest binge-watching propensity?
- Which geographic markets sustain the longest subscription durations?
- Does content rating meaningfully predict renewal probability?

Visualizations include correlation matrices, genre distribution charts, viewing-hour heatmaps, boxplots, scatter plots, and time-series retention trends.

---

## Key Performance Indicators

| KPI | Formula |
|---|---|
| **Viewer Engagement Score** | Weighted composite of completion, duration, rating, and pause frequency |
| **Completion Rate** | Completed Episodes ÷ Started Episodes |
| **Retention Rate** | Renewed Users ÷ Total Users |
| **Churn Rate** | Lost Subscribers ÷ Total Subscribers |
| **Average Watch Time** | Mean minutes watched per session |
| **Binge Rate** | % of users watching 3+ episodes per session |

---

## Dashboard Overview

The Power BI dashboard is organized into five purpose-built views:

### Executive Dashboard
A high-level operational view featuring active users, retention rate, churn rate, completion rate, average watch time, daily active users trend, monthly retention curve, genre popularity ranking, and subscription growth timeline.

### Viewer Behavior Dashboard
Drill-down analysis of individual viewing patterns including watch duration distribution, pause frequency analysis, completion percentage breakdown, viewing-hour heatmap, and binge session metrics.

### Content Performance Dashboard
Title-level performance metrics including engagement score, completion rate, average rating, and renewal contribution — visualized through bubble charts, scatter plots, tree maps, and ranking tables.

### Retention Analytics Dashboard
Subscription lifecycle analysis covering renewal probability curves, churn breakdown, subscription duration distribution, cohort analysis, and conversion funnels.

### Content Recommendation Dashboard
Each title is classified into one of three acquisition tiers based on performance thresholds:

| Tier | Signal |
|---|---|
| 🟢 **Renew** | High engagement, strong retention, favorable ratings |
| 🟡 **Monitor** | Mixed performance requiring further observation |
| 🔴 **Remove** | Low engagement, elevated churn contribution, poor ratings |

---

## Machine Learning Model

### Objective

Predict whether a subscriber will renew at the end of their current billing period.

### Target Variable

```
Renewal  (Binary: 1 = Renewed, 0 = Churned)
```

### Feature Set

| Category | Features |
|---|---|
| Behavioral | Watch Duration, Completion %, Pause Count, Episodes Watched, Binge Session |
| Content | Genre, Rating Given |
| Account | Subscription Type |

### Algorithms Evaluated

- Logistic Regression
- Decision Tree
- Random Forest *(primary model)*
- XGBoost

### Evaluation Metrics

`Accuracy` · `Precision` · `Recall` · `F1 Score` · `ROC-AUC`

---

## Business Insights

The following intelligence is produced by StreamSense from engagement data:

> **Insight 1 — Completion Drives Renewal**
> Subscribers completing more than **80%** of a series exhibit significantly higher renewal rates compared to partial viewers.

> **Insight 2 — Pause Frequency Signals Disengagement**
> Sessions with more than **15 pauses** strongly correlate with subscriber churn in the subsequent billing period.

> **Insight 3 — Genre as a Retention Lever**
> Drama and Thriller genres consistently deliver the highest long-term viewer retention across all demographics.

> **Insight 4 — Binge Behavior Predicts Loyalty**
> Binge-watchers are substantially more likely to renew subscriptions and maintain longer subscription durations.

> **Insight 5 — Ratings Reflect Retention Intent**
> Subscribers who rate content **4★ or above** demonstrate measurably stronger long-term retention patterns.

> **Insight 6 — Premium Tier Engagement Advantage**
> Premium subscribers watch longer sessions on average and exhibit consistently lower churn rates than Basic-tier users.

---

## Recommendation Framework

| Tier | Criteria |
|---|---|
| 🟢 **Renew** | Completion Rate > 75% · Engagement Score > 80 · Rating > 4.2 · Renewal Rate > 70% · Churn < 15% |
| 🟡 **Monitor** | Moderate engagement · Average completion rate · Mixed renewal performance |
| 🔴 **Remove** | Low completion · Low engagement score · Elevated churn contribution · Poor ratings |

---

## Technology Stack

| Category | Tools |
|---|---|
| Programming Language | Python 3.11 |
| Data Analysis | Pandas, NumPy |
| Visualization | Matplotlib, Seaborn |
| Business Intelligence | Power BI |
| Machine Learning | Scikit-Learn, XGBoost |
| Data Storage | PostgreSQL / CSV |
| Development Environment | Jupyter Notebook |
| Version Control | Git & GitHub |

---

## Getting Started

### Prerequisites

- Python 3.11+
- Microsoft Power BI Desktop
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/StreamSense.git
cd StreamSense

# Install dependencies
pip install -r requirements.txt
```

### Running the Pipeline

```bash
# Step 1 — Data cleaning
python src/preprocessing.py

# Step 2 — Feature engineering
python src/features.py

# Step 3 — Train the ML model
python src/model.py
```

### Opening the Dashboard

Launch `dashboard/StreamSense.pbix` using **Microsoft Power BI Desktop**.

---

## Deliverables

- ✅ Cleaned and validated dataset
- ✅ Feature-engineered dataset with derived KPIs
- ✅ Annotated EDA notebook
- ✅ Interactive Power BI dashboard (`.pbix`)
- ✅ Trained machine learning model with evaluation report
- ✅ Business recommendation report
- ✅ Full project documentation

---

## Future Enhancements

- Real-time streaming analytics pipeline
- Personalized content recommendation engine
- A/B testing module for content experiments
- Time-series forecasting for subscriber growth
- Deep learning–based churn prediction
- Automated executive report generation
- Live dashboard integration with streaming platform APIs

---

## License

This project is licensed under the **MIT License**. See the [`LICENSE`](LICENSE) file for details.

---

## Acknowledgements

StreamSense was developed as part of a Data Analytics and Business Intelligence capstone project, demonstrating how viewer engagement data can be systematically transformed into strategic insights for content acquisition teams in the media and entertainment industry.
