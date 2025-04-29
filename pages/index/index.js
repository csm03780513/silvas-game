Page({
  data: {
    server: 'https://olmercycheperur.com/silva',
    gameId: '',
    playerId: '',
    playerSymbol: '',
    board: [['', '', ''], ['', '', ''], ['', '', '']],
    currentTurn: '',
    winner: '',
    toastShow: false,
  },

  handleCloseToast(e) {
    this.setData({
      toastShow: false,
    });
  },
  onLoad() {
    this.setData({ playerId: 'player-' + Math.random().toString(36).substr(2, 5) });
  },

  onGameIdInput(e) {
    this.setData({ gameId: e.detail.value });
    this.data.gameId = e.detail.value;
  },

  createGame() {
    my.request({
      url: `${this.data.server}/create`,
      method: 'POST',
      success: (res) => {
        const gameId = res.data.gameId;
        this.setData({ gameId });
        this.joinGame(); // auto join as creator
      }
    });
  },

  joinGame() {
    console.log("gameId here is:"+`${this.data.gameId}`);
    my.request({
      url: `${this.data.server}/join/${this.data.gameId}`,
      method: 'POST',
      data: { uid: this.data.playerId },
      success: (res) => {
        this.setData({ playerSymbol: res.data.symbol });
        this.pollBoard();
      }
    });
  },

  makeMove(e) {
    const { row, col } = e.currentTarget.dataset;
    my.request({
      url: `${this.data.server}/move/${this.data.gameId}`,
      method: 'POST',
      data: {
        uid: this.data.playerId,
        row,
        col
      },
      success: (res) => {
        this.setData({ board: res.data.board, currentTurn: res.data.nextTurn, winner: res.data.winner });
        if(this.data.winner!=null){
          this.data.toastShow = true;
        }
      }
    });
  },

  pollBoard() {
    setInterval(() => {
      my.request({
        url: `${this.data.server}/status/${this.data.gameId}`,
        method: 'GET',
        success: (res) => {
          this.setData({ board: res.data.board, currentTurn: res.data.currentTurn, winner: res.data.winner });
          if(this.data.winner!=null){
            this.data.toastShow = true;
          }
        }
      });
    }, 500); // poll every 500ms
  }
});
