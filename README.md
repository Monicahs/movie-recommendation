# Movie Recommendation Web Application

![Screenshot (605)](https://github.com/user-attachments/assets/ca1a3108-281c-4c35-bc2b-2ffd615a5f2b)
![Screenshot (606)](https://github.com/user-attachments/assets/283318a8-cb8d-483f-8e4e-2f1f8159d0f6)

## Overview
This is a machine learning-based web application that recommends 5 movies similar to the movie entered by the user. The application uses a content-based filtering approach to suggest movies based on their similarity. It helps users discover movies that align with their interests.

## Features
- Input a movie title to get 5 similar movie recommendations.
- Uses a machine learning model to analyze movie similarity.
- User-friendly web interface.
- Fast and accurate recommendations.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript (React)
- **Backend:** Python (Flask/Django)
- **Machine Learning:** Scikit-learn, Pandas, NumPy
- **Data Storage:** CSV(Movie Dataset)

## Installation

### Prerequisites
Ensure you have the following installed:
- Python (>=3.7)
- Pip
- Virtual environment (optional but recommended)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Monicahs/movie-recommendation.git
   cd movie-recommendation
   ```

2. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```

4. Run the application:
   ```sh
   python app.py
   ```

5. Open the web browser and go to:
   ```
   http://127.0.0.1:5000/
   ```

## Usage
1. Enter a movie title in the search bar.
2. Click the "Recommend" button.
3. The system will display 5 similar movies based on the selected algorithm.

## How It Works
1. The application processes the movie dataset and extracts features (such as genres, descriptions, and keywords).
2. It uses machine learning techniques like TF-IDF and cosine similarity to compute movie similarities.
3. When a user enters a movie, the system finds and displays the 5 most similar movies.

## Dataset
The application uses a preprocessed movie dataset that includes details like movie titles, genres, descriptions, and keywords. The dataset can be sourced from **TMDB**, **IMDb**, or other open datasets.

## Future Enhancements
- Add collaborative filtering for better recommendations.
- Implement user authentication and profile-based recommendations.
- Include more filters such as release year, ratings, and actors.
