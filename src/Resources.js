class Resources {
    constructor() {
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            mc: "/sprites/hero-sheet.png",
            shadow: "/sprites/shadow.png",
        };
        // bucket to keep all of our sprites
        this.images = {};

        // load each image
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }
            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}


export const resources = new Resources();