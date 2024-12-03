from flask import Flask, request, jsonify
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load dataset
dataset_path = 'dataset/finaldatas.csv'  # Path to your dataset
df = pd.read_csv(dataset_path)

# Preprocess data: Combine genres and overview as features
df['combined_features'] = df['genres'] + ' ' + df['overview']

# Vectorize combined features using TF-IDF
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(df['combined_features'])

# Calculate cosine similarity between all movies
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

@app.route('/recommend', methods=['GET'])
def recommend_movies():
    movie_title = request.args.get('movie_title')
    
    if not movie_title:
        return jsonify({"error": "Please provide a movie title for recommendations."})

    movie_title = movie_title.strip().lower()
    df['normalized_title'] = df['title'].str.strip().str.lower()

    # Search for movies containing the given title as a substring
    matching_movies = df[df['normalized_title'].str.contains(movie_title, case=False, na=False)]

    if matching_movies.empty:
        return jsonify({"error": "Movie not found in dataset."})

    # If we have matching movies, get the first one (or all)
    movie_idx = matching_movies.index[0]

    # Calculate similarity scores for the matched movie
    sim_scores = list(enumerate(cosine_sim[movie_idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)[1:6]

    # Generate recommendation list
    movie_list = [
        {"title": df.iloc[idx]['title'], "similarity_score": round(score, 2)}
        for idx, score in sim_scores
    ]
    
    return jsonify(movie_list)

if __name__ == '__main__':
    app.run(debug=True)
