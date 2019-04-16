const fetchNews = () => fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=429904aa01f54a39a278a406acf50070').then(res => res.json());

export default {
    fetchNews
}
