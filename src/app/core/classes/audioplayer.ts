export class AudioPlayer {
  private audioObj: any;
  private currentURL: string;
  private audioIsPaused: boolean;

  constructor() {
    this.audioObj = new Audio();
    this.audioIsPaused = false;
  }

  public playURL(url: string) {
    try {
      if ( !this.audioIsPaused ) {
        this.audioObj.src = url;
        this.currentURL = url;
        this.audioObj.load();
        this.audioIsPaused = !this.audioIsPaused;
      }
      this.audioObj.play();
    } catch (exp) {
      console.log(exp.message);
    }
  }

  public playForDuration(from, to) {
    try {
      this.audioObj.src = this.currentURL + '#t=' + from + ',' + to;
      this.audioObj.load();
      this.audioObj.play();
    } catch (exp) {
      console.log(exp.message);
    }
  }

  public pauseAudio() {
    try {
      this.audioObj.pause();
      this.audioIsPaused = true;
    } catch (exp) {
      console.log(exp.message);
    }
  }

  public stopAudio() {
    try {
      this.audioObj.pause();
      this.audioObj.currentTime = 0;
    } catch (exp) {
      console.log(exp.message);
    }
  }
}
