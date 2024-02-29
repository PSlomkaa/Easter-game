export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', e => {
            if ((e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key ==='ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
                ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            } 
            if (e.key == ' ' && this.keys.indexOf('space') === -1){
                this.keys.push('space')
            }
            console.log(e.key, this.keys);
        });
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' || 
                e.key === 'ArrowUp' ||
                e.key ==='ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter' ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            if (e.key == ' '){
                this.keys.splice(this.keys.indexOf('space'),1)
            }
            console.log(e.key, this.keys);
        });
    }
}