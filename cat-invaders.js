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
            'wall': new defs.Cube(),
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            bullet_material: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#FFffff")}),
            enemy_material: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#FF0000")})
        };

        // Make simpler dummy shapes for representing all other shapes during collisions:
        this.colliders = [
            {intersect_test: Body.intersect_sphere, points: new defs.Subdivision_Sphere(1), leeway: .5},
            {intersect_test: Body.intersect_sphere, points: new defs.Subdivision_Sphere(2), leeway: .3},
            {intersect_test: Body.intersect_cube, points: new defs.Cube(), leeway: .1}
        ];
        // change this to switch to a different dummy shape
        this.collider_selection = 0;

        // for easy changing
        this.top_of_screen = 20;
        this.bottom_of_screen = 0;
        this.enemy_spawn_time = 90;

        this.top_edge = new Body(this.shapes.wall, this.materials.plastic, vec3(20, 0.5, 0.5))
            .emplace(Mat4.translation(-10, this.top_of_screen+1, 0), 0, 0);
        this.bottom_edge = new Body(this.shapes.wall, this.materials.plastic, vec3(20, 0.5, 0.5))
            .emplace(Mat4.translation(-10, this.bottom_of_screen-1, 0), 0, 0);
        this.top_edge.inverse = Mat4.inverse(this.top_edge.drawn_location);
        this.bottom_edge.inverse = Mat4.inverse(this.bottom_edge.drawn_location);

        // position of cat
        this.position = 0;

        // for spawning new bullets
        this.shot = false;

        // locations of current bullets
        // this.bullet_x = [];
        // this.bullet_y = [];
        this.bullets = [];
        this.bullet_velocity = vec3(0, 1, 0);

        // locations of current enemies
        // this.enemy_x = [];
        // this.enemy_y = [];
        this.enemies = [];
        this.enemy_velocity = vec3(0, -0.5, 0);

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

    draw_bullet(context, program_state) {
        //const {points, leeway} = this.colliders[this.collider_selection];
        //const size = vec3(1 + leeway, 1 + leeway, 1 + leeway);
        for (let b of this.bullets) {
            this.shapes.bullet.draw(context, program_state, b.drawn_location, this.materials.bullet_material);
        }
        // model_transform = model_transform.times(Mat4.translation(this.bullet_x.at(index), this.bullet_y.at(index), 0));
        // model_transform = model_transform.times(Mat4.scale(0.5, 0.5, 0.5)); // TODO maybe delete later, just for shrinking-cube purposes
        // this.shapes.bullet.draw(context, program_state, model_transform, this.materials.plastic);
        // if (!this.stopped)
        //     this.bullet_y[index] = this.bullet_y.at(index) + 1;
        // return model_transform;
    }

    draw_enemy(context, program_state)
    {
        //const {points, leeway} = this.colliders[this.collider_selection];
        //const size = vec3(1 + leeway, 1 + leeway, 1 + leeway);
        for (let b of this.enemies) {
            this.shapes.enemy.draw(context, program_state, b.drawn_location, this.materials.enemy_material);
        }
        // model_transform = model_transform.times(Mat4.translation(this.enemy_x.at(index), this.enemy_y.at(index), 0));
        // this.shapes.enemy.draw(context, program_state, model_transform, this.materials.bullet_material);
        // if (!this.stopped & (this.counter%(this.enemy_spawn_time / 3))==0) // moves 3x as fast as spawning rate
        //     this.enemy_y[index] = this.enemy_y.at(index) - 1;
        // return model_transform;
    }

    add_bullet(position)
    {
        this.bullets.push(new Body(this.shapes.bullet, this.materials.bullet_material, vec3(0.5, 0.5, 0.5))
            .emplace(Mat4.translation(position, this.bottom_of_screen, 0), this.bullet_velocity, 0));
    }

    add_enemy(position)
    {
        this.enemies.push(new Body(this.shapes.enemy, this.materials.enemy_material, vec3(1, 1, 1))
            .emplace(Mat4.translation(position, this.top_of_screen, 0), this.enemy_velocity, 0));
    }

    remove_bullet(index)
    {
        if (index < this.bullets.length)
            this.bullets.splice(index, 1);
    }
    remove_enemy(index)
    {
        if (index < this.enemies.length)
            this.enemies.splice(index, 1);
    }
    check_collisions()
    {
        const collider = this.colliders[this.collider_selection];
        let i1 = 0;
        let i2 = 0;
        for (let a of this.bullets)
        {
            for (let b of this.enemies)
            {
                // if bullet has collided with enemy
                if (a.check_if_colliding(b, collider))
                {
                    this.remove_bullet(i1);
                    this.remove_enemy(i2);
                }
                if (b.check_if_colliding(this.bottom_edge, collider))
                    this.remove_enemy(i2);
                i2 = i2+1;
            }
            if (a.check_if_colliding(this.top_edge, collider))
                this.remove_bullet(i1);
            i1 = i1+1;
        }
    }

    update_state()
    {
        for (let a of this.bullets)
        {
            a.drawn_location = a.drawn_location.times(Mat4.translation(0, 1, 0));
            a.inverse = Mat4.inverse(a.drawn_location);
        }
        for (let b of this.enemies) {
            b.drawn_location = b.drawn_location.times(Mat4.translation(0, -1 / 10, 0));
            b.inverse = Mat4.inverse(b.drawn_location);
        }
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
        if (!this.transition && !this.stopped) {

            model_transform = model_transform.times(Mat4.translation(this.position, 0, 0));

            // draws the cat at current position
            this.shapes.cat.draw(context, program_state, model_transform, this.materials.plastic.override({color: blue}));

            // if "s" has been pressed, spawn a new bullet
            if (this.shot) {
                this.shot = false;
                this.add_bullet(this.position);
                // this.bullet_x.push(this.position);
                // this.bullet_y.push(0);
            }

            // for (let i = 0; i < this.bullets.length; i++) {
            //
            // // for (let i = 0; i < this.bullet_x.length; i++) {
            // //     // if the bullet is too far up, remove it
            // //     if (this.bullet_y.at(i) > this.top_of_screen * 1.5)
            // //     {
            // //         this.bullet_x.shift();
            // //         this.bullet_y.shift();
            // //     }
            //
            //     // draw the bullets
            //     let center = Mat4.identity();
            //     center = this.draw_bullet(context, program_state, center, i);
            // }

            this.update_state();
            this.check_collisions();

            this.draw_bullet(context, program_state);

            // spawning for test purposes
            if (this.spawn)
                if ((this.counter % this.enemy_spawn_time) == 0) {
                    // spawn enemies in a row
                    for (let i = -9; i < 10; i+=3) {
                        this.add_enemy(i);
                    }
                }

            this.draw_enemy(context, program_state);

            // for (let i = 0; i < this.enemies.length; i++) {
            // //for (let i = 0; i < this.enemy_x.length; i++) {
            //     // if the enemy is too far down, remove it
            //     // if (this.enemy_y.at(i) <= 0)
            //     // {
            //     //     this.enemy_x.shift();
            //     //     this.enemy_y.shift();
            //     // }
            //
            //     // draw the bullets
            //     let center = Mat4.identity();
            //     center = this.draw_enemy(context, program_state, center, i);
            // }
        }
        // if on transitioning screen, display next level
        else if (!this.stopped) {
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
        // displaying "press space" message when paused
        if (this.stopped){
            // note: 3 in the z coordinate so that text shows up *on top* of any other items
            let center = Mat4.identity().times(Mat4.translation(-12, (this.top_of_screen-this.bottom_of_screen) / 2, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
            let start_string = "Press space to start or continue.";
            this.shapes.text.set_string(start_string, context.context);
            this.shapes.text.draw(context, program_state, center, this.text_image);
        }
        // displaying score
        let top_left = Mat4.identity().times(Mat4.translation(-18, this.top_of_screen, 3)).times(Mat4.scale(0.3, 0.3, 0.3));
        let score_string = "Score: " + this.score;
        this.shapes.text.set_string(score_string, context.context);
        this.shapes.text.draw(context, program_state, top_left, this.text_image);

        // displaying current level
        let middle = Mat4.identity().times(Mat4.translation(-2, this.top_of_screen, 3)).times(Mat4.scale(0.3, 0.3, 0.3));
        let lvl_string = "Level: " + this.level + " # of bullets: " + this.bullets.length; // TODO remove testing
        this.shapes.text.set_string(lvl_string, context.context);
        this.shapes.text.draw(context, program_state, middle, this.text_image);

    }
}