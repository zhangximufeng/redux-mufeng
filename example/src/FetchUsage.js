import React from 'react';
import { connectMu } from 'redux-mufeng';

class FetchUsage extends React.Component {
    render() {
        console.log(this.props.fetchNews);
        const { data: fetchNews = {} } = this.props.fetchNews || {};
        return (
            <div>
                <button onClick={() => this.props.setMuState({ funcName: 'fetchNews' })}>Fetch News</button>
                <ul>
                    { fetchNews.isFetching && <li>loading...</li> }
                    { fetchNews.articles && fetchNews.articles.map(news => <li key={news.url}>{news.title}</li>) }
                </ul>
            </div>
        )
    }
}

export default connectMu(['fetchNews'])(FetchUsage);
