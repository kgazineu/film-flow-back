import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import sqlalchemy

DATABASE_URL = "postgresql://filmflow:password@localhost:5432/filmflow"

engine = sqlalchemy.create_engine(DATABASE_URL)

filmes = pd.read_csv('./datasets/tmdb_5000_movies.csv')

filmes.drop_duplicates(subset=['original_title'], keep='first', inplace=True)

filmes['overview'] = filmes['overview'].fillna('')
filmes['genres'] = filmes['genres'].fillna('')
filmes['tagline'] = filmes['tagline'].fillna('')

filmes['infos'] = filmes['tagline'] + ' ' + filmes['overview']

vec = TfidfVectorizer()
Tfidf = vec.fit_transform(filmes['infos'].apply(lambda x: np.str_(x)))

cosine_sim = cosine_similarity(Tfidf)

sim_filmes = pd.DataFrame(cosine_sim, columns=filmes['original_title'], index=filmes['original_title'])

sim_filmes.to_sql('similarity', engine, if_exists='extend')

pd.read_sql('similarity', engine)