import {defs, tiny} from './examples/common.js';
import {Text_Line} from './examples/text-demo.js'
import {Body} from './examples/collisions-demo.js'

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

// TODO: cat model goes here
class Cat extends Shape {
    constructor() {
        super("position", "normal",);
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

// TODO: make bullet like an actual bullet
class Bullet extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
        this.bullet_x = 0;
        this.bullet_y = 0;
    }
}

// TODO: create enemy model
class Enemy extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
        this.bullet_x = 0;
        this.bullet_y = 0;
    }
}

class Base_Scene extends Scene {
    /**
     *  **Base_scene** is a Scene that can be added to any display canvas.
     *  Setup the shapes, materials, camera, and lighting here.
     */
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();
        this.hover = this.swarm = false;
        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            'cat': new Cat(),
            'bullet': new Bullet(),
            'enemy': new Enemy(),
            'text': new Text_Line(35), // change text length here
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            bullet_material: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("FF0000")}),
        };

        // for easy changing
        this.top_of_screen = 20;
        this.bottom_of_screen = 0;
        this.enemy_spawn_time = 90;

        // position of cat
        this.position = 0;

        // for spawning new bullets
        this.shot = false;

        // locations of current bullets
        this.bullet_x = [];
        this.bullet_y = [];

        // locations of current enemies
        this.enemy_x = [];
        this.enemy_y = [];

        this.stopped = true;

        // TODO consider using something else for timing
        this.counter = 0;

        // TODO for testing purposes
        this.spawn = false;

        // for keeping track of score
        this.score = 0;

        // level variables
        this.level = 0;
        this.transition = false; // for transition screen ("Next level: x")
        this.level_time = 999;
        this.transition_time = 99;

        // To show text you need a Material like this one:
        const texture = new defs.Textured_Phong(1);
        this.text_image = new Material(texture, {
            ambient: 1, diffusivity: 0, specularity: 0,
            texture: new Texture("assets/text.png")
        });
    }

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            //this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(0, -10, -30));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }
}

export class CatInvaders extends Base_Scene {
    /**
     * This Scene object can be added to any display canvas.
     * We isolate that code so it can be experimented with on its own.
     * This gives you a very small code sandbox for editing a simple scene, and for
     * experimenting with matrix transformations.
     */

    make_control_panel() {
        this.key_triggered_button("Left", ['a'], () => {
            if (!this.stopped)
                this.position = this.position - 1;
        });
        this.key_triggered_button("Right", ['d'], () => {
            if (!this.stopped)
                this.position = this.position + 1;
        });
        this.key_triggered_button("Shoot", ['s'], () => {
            if (!this.stopped)
                this.shot = true;
        });
        this.key_triggered_button("Pause/Unpause", [' '], () =>{
            this.stopped = !this.stopped;
        });

        this.new_line();
        // TODO for testing purposes
        this.key_triggered_button("Spawn enemies [FOR TESTING PURPOSES]", ['p'], () => {
           this.spawn = !this.spawn;
        });
    }

    draw_bullet(context, program_state, model_transform, index) {
        model_transform = model_transform.times(Mat4.translation(this.bullet_x.at(index), this.bullet_y.at(index), 0));
        model_transform = model_transform.times(Mat4.scale(0.5, 0.5, 0.5)); // TODO maybe delete later, just for shrinking-cube purposes
        this.shapes.bullet.draw(context, program_state, model_transform, this.materials.plastic);
        if (!this.stopped)
            this.bullet_y[index] = this.bullet_y.at(index) + 1;
        return model_transform;
    }

    draw_enemy(context, program_state, model_transform, index)
    {
        model_transform = model_transform.times(Mat4.translation(this.enemy_x.at(index), this.enemy_y.at(index), 0));
        this.shapes.enemy.draw(context, program_state, model_transform, this.materials.bullet_material);
        if (!this.stopped & (this.counter%(this.enemy_spawn_time / 3))==0) // moves 3x as fast as spawning rate
            this.enemy_y[index] = this.enemy_y.at(index) - 1;
        return model_transform;
    }

    display(context, program_state) {
        super.display(context, program_state);
        const blue = hex_color("#1a9ffa");
        let model_transform = Mat4.identity();
        let time = program_state.animation_time / 1000;

        // at a certain point in time, increase difficulty
        // TODO consider changing time or make it based on score
        if (this.counter%this.level_time == 0 ) {
            this.level = this.level + 1;
            this.transition = true;
        }

        // TODO consider making a separate counter for transitions
        // (potentially problems with spawning being offset)
        // other potential solution: reset counter to 0 when new level starts
        if (!this.stopped || this.transition)
            this.counter = this.counter + 1;

        // normal game play if not transitioning to next level
        if (!this.transition) {

            model_transform = model_transform.times(Mat4.translation(this.position, 0, 0));

            // draws the cat at current position
            this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic.override({color: blue}));

            // if "s" has been pressed, spawn a new bullet
            if (this.shot) {
                this.shot = false;
                this.bullet_x.push(this.position);
                this.bullet_y.push(0);
            }

            for (let i = 0; i < this.bullet_x.length; i++) {
                // if the bullet is too far up, remove it
                if (this.bullet_y.at(i) > this.top_of_screen * 1.5)
                {
                    this.bullet_x.shift();
                    this.bullet_y.shift();
                }

                // draw the bullets
                let center = Mat4.identity();
                center = this.draw_bullet(context, program_state, center, i);
            }

            // spawning for test purposes
            if (this.spawn)
                if ((this.counter % this.enemy_spawn_time) == 0) {
                    // spawn enemies in a row
                    for (let i = -5; i < 6; i++) {
                        this.enemy_x.push(i * 3);
                        this.enemy_y.push(this.top_of_screen);
                    }
                }

            for (let i = 0; i < this.enemy_x.length; i++) {
                // if the enemy is too far down, remove it
                if (this.enemy_y.at(i) <= 0)
                {
                    this.enemy_x.shift();
                    this.enemy_y.shift();
                }

                // draw the bullets
                let center = Mat4.identity();
                center = this.draw_enemy(context, program_state, center, i);
            }
            // displaying "press space" message when paused
            if (this.stopped){
                // note: 3 in the z coordinate so that text shows up *on top* of any other items
                let center = Mat4.identity().times(Mat4.translation(-12, (this.top_of_screen-this.bottom_of_screen) / 2, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
                let start_string = "Press space to start or continue.";
                this.shapes.text.set_string(start_string, context.context);
                this.shapes.text.draw(context, program_state, center, this.text_image);
            }
        }
        // if on transitioning screen, display next level
        else {
            let center = Mat4.identity().times(Mat4.translation(-6, (this.top_of_screen-this.bottom_of_screen) / 2, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
            let start_string = "Next Level: " + this.level;
            this.shapes.text.set_string(start_string, context.context);
            this.shapes.text.draw(context, program_state, center, this.text_image);
            // after some time, return to normal gameplay
            if ((this.counter-this.transition_time)%this.level_time == 0)
            {
                this.transition = false;
            }
        }
        // displaying score
        let top_left = Mat4.identity().times(Mat4.translation(-18, this.top_of_screen, 3)).times(Mat4.scale(0.3, 0.3, 0.3));
        let score_string = "Score: " + this.score;
        this.shapes.text.set_string(score_string, context.context);
        this.shapes.text.draw(context, program_state, top_left, this.text_image);

        // displaying current level
        let middle = Mat4.identity().times(Mat4.translation(-2, this.top_of_screen, 3)).times(Mat4.scale(0.3, 0.3, 0.3));
        let lvl_string = "Level: " + this.level;
        this.shapes.text.set_string(lvl_string, context.context);
        this.shapes.text.draw(context, program_state, middle, this.text_image);

    }
}