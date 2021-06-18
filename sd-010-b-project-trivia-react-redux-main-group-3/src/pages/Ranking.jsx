import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingPlayers: [],
    };
    this.handleRanking = this.handleRanking.bind(this);
  }

  componentDidMount() {
    this.handleRanking();
  }

  handleRanking() {
    const localRanking = JSON.parse(localStorage.getItem('ranking'));
    localRanking.sort((a, b) => b.score - a.score);
    this.setState({
      rankingPlayers: localRanking,
    });
    console.log(localRanking);
  }

  render() {
    const { rankingPlayers } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>
        {rankingPlayers.map((item, index) => (
          <div key={ index }>
            <img src={ item.gravatarEmail } alt={ item.nome } />
            <p data-testid={ `player-name-${index}` }>{item.nome}</p>
            <p data-testid={ `player-score-${index}` }>{item.score}</p>
          </div>
        ))}
        <Link data-testid="btn-go-home" to="/">Voltar</Link>
      </div>
    );
  }
}
