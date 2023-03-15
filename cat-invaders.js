import {defs, tiny} from './examples/common.js';
import {Text_Line} from './examples/text-demo.js'
import {Body} from './examples/collisions-demo.js'

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture, Square,
} = tiny;

class Cube extends Shape {
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
class Dish extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [1, 1.5, 5], [3, 1.5, 4], [4, 1.5, 3], [5, 1.5, 1], [1, 0, 2], [2, 0, 1],
            [-1, 1.5, 5], [-3, 1.5, 4], [-4, 1.5, 3], [-5, 1.5, 1], [-1, 0, 2], [-2, 0, 1],
            [-1, 1.5, -5], [-3, 1.5, -4], [-4, 1.5, -3], [-5, 1.5, -1], [-1, 0, -2], [-2, 0, -1],
            [1, 1.5, -5], [3, 1.5, -4], [4, 1.5, -3], [5, 1.5, -1], [1, 0, -2], [2, 0, -1], [0,0,0]
        );
        this.arrays.normal = Vector3.cast(
            [1, 1.5, 5], [3, 1.5, 4], [4, 1.5, 3], [5, 1.5, 1], [1, 0, 2], [2, 0, 1],
            [-1, 1.5, 5], [-3, 1.5, 4], -[4, 1.5, 3], [-5, 1.5, 1], [-1, 0, 2], [-2, 0, 1],
            [-1, 1.5, -5], [-3, 1.5, -4], [-4, 1.5, -3], [-5, 1.5, -1], [-1, 0, -2], [-2, 0, -1],
            [1, 1.5, -5], [3, 1.5, -4], [4, 1.5, -3], [5, 1.5, -1], [1, 0, -2], [2, 0, -1], [0, 0, 0]
        );
        this.indices.push(
            6,0,4,
            0,4,1,
            4,1,5,
            1,5,2,
            5,2,3,
            3,5,23,
            3,23,21,
            23,21,20,
            23,20,22,
            20,22,19,
            22,19,18,
            22,18,16,
            18,12,16,
            16,12,13,
            16,13,17,
            17,14,13,
            14,17,15,
            15,17,11,
            15,11,9,
            9,11,8,
            11,8,10,
            8,10,7,
            7,10,6,
            6,10,4,
            10,4,24,
            10,11,24,
            11,17,24,
            17,16,24,
            16,22,24,
            22,23,24,
            23,5,24,
            5,4,24
        );
    }
}
class Pyramid_Face extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [1, 0, 0], [0, 0, -1], [0, 2, 0],
            [0, 0, -1], [-1, 0, 0], [0, 2, 0],
            [-1, 0, 0], [0, 0, 1], [0, 2, 0],
            [0, 0, 1], [1, 0, 0], [0, 2, 0],
            [0, 0, 1], [1, 0, 0], [0, 0, -1],
            [-1, 0, 0], [0, 0, 1], [0, 0, -1],
        );
        this.arrays.normal = Vector3.cast(
            [2, -2, 1], [2, -2, 1], [2, -2, 1],
            [-2, -2, 1], [-2, -2, 1], [-2, -2, 1],
            [-2, 2, 1], [-2, 2, 1], [-2, 2, 1],
            [2, 2, 1], [2, 2, 1], [2, 2, 1],
            [0, -1, 0],[0, -1, 0],[0, -1, 0],
            [0, -1, 0],[0, -1, 0],[0, -1, 0],
        );
    }
}
class Trapizoid extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [1.5, 0, 1], [1.25, 0.5, 0.75],
            [-1.5, 0, 1], [-1.25, 0.5, 0.75],
            [-1.5, 0, -1], [-1.25, 0.5, -0.75],
            [1.5, 0, -1], [1.25, 0.5, -0.75]
        );
        this.arrays.normal = Vector3.cast(
            [1.5, 0, 1], [1.25, 0.25, 0.75],
            [-1.5, 0, 1], [-1.25, 0.25, 0.75],
            [-1.5, 0, -1], [-1.25, 0.25, -0.75],
            [1.5, 0, -1], [1.25, 0.25, -0.75]
        );
        this.indices.push(
            0,1,3,  0,3,2,
            3,2,4,  3,4,5,
            4,5,7,  4,7,6,
            6,7,0,  0,1,7,
            1,3,7,  3,5,7
        );
    }
}

// Objects for UFO
class Dome extends Shape {
    constructor() {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [1, 0, 4] , [3, 0, 3], [4, 0, 1], [2, 1.5, 2],
            [-1, 0, 4] , [-3, 0, 3], [-4, 0, 1], [-2, 1.5, 2],
            [-1, 0, -4] , [-3, 0, -3], [-4, 0, -1], [-2, 1.5, -2],
            [1, 0, -4] , [3, 0, -3], [4, 0, -1], [2, 1.5, -2]
        );
        this.arrays.normal = Vector3.cast(
            [1, 0, 4] , [3, 0, 3], [4, 0, 1], [2, 1.5, 2],
            [-1, 0, 4] , [-3, 0, 3], [-4, 0, 1], [-2, 1.5, 2],
            [-1, 0, -4] , [-3, 0, -3], [-4, 0, -1], [-2, 1.5, -2],
            [1, 0, -4] , [3, 0, -3], [4, 0, -1], [2, 1.5, -2]
        );
        this.indices.push(
            14,3,2,
            3,2,1,
            3,1,0,
            3,0,7,
            7,0,4,
            7,4,5,
            7,5,6,
            7,6,11,
            6,11,10,
            11,10,9,
            11,9,8,
            11,8,15,
            15,8,12,
            15,12,13,
            15,13,14,
            15,14,3,
            15,3,7,
            15,11,7
        );
    }
}
class Dome_Cylinder extends Shape {
    constructor() {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [1, 1.5, 4], [3, 1.5, 3], [4, 1.5, 1],
            [4, 1.5, -1], [3, 1.5, -3], [1, 1.5, -4],
            [-1, 1.5, 4] , [-3, 1.5, 3], [-4, 1.5, 1],
            [-4, 1.5, -1], [-3, 1.5, -3], [-1, 1.5, -4],
            [1, 0, 4], [3, 0, 3], [4, 0, 1],
            [4, 0, -1], [3, 0, -3], [1, 0, -4],
            [-1, 0, 4] , [-3, 0, 3], [-4, 0, 1],
            [-4, 0, -1], [-3, 0, -3], [-1, 0, -4],
        );
        this.arrays.normal = Vector3.cast(
            [1, 1.5, 4], [3, 1.5, 3], [4, 1.5, 1],
            [4, 1.5, -1], [3, 1.5, -3], [1, 1.5, -4],
            [-1, 1.5, 4] , [-3, 1.5, 3], [-4, 1.5, 1],
            [-4, 1.5, -1], [-3, 1.5, -3], [-1, 1.5, -4],
            [1, 0, 4], [3, 0, 3], [4, 0, 1],
            [4, 0, -1], [3, 0, -3], [1, 0, -4],
            [-1, 0, 4] , [-3, 0, 3], [-4, 0, 1],
            [-4, 0, -1], [-3, 0, -3], [-1, 0, -4],
        );
        this.indices.push(
            0,12,1,
            1,12,13,
            1,13,2,
            2,13,14,
            2,14,3,
            3,14,15,
            3,15,4,
            4,15,16,
            4,16,5,
            5,16,17,
            5,17,11,
            11,17,23,
            6,18,7,
            7,18,19,
            7,19,8,
            8,19,20,
            8,20,9,
            9,20,21,
            9,21,10,
            10,21,22,
            10,22,11,
            11,22,23,
            6,18,0,
            0,18,12
        );
    }
}
class UfoPlate extends Shape {
    constructor() {
        super("position", "normal",);
        this.arrays.position = Vector3.cast(
            [6, 1, 1.5], [4.5, 1, 4.5], [1.5, 1, 6],
            [-1.5, 1, 6], [-4.5, 1, 4.5], [-6, 1, 1.5],
            [-6, 1, -1.5], [-4.5, 1, -4.5], [-1.5, 1, -6],
            [1.5, 1, -6], [4.5, 1, -4.5], [6, 1, -1.5],
            [8, 0, 2], [6, 0, 6], [2, 0, 8],
            [-2, 0, 8], [-6, 0, 6], [-8, 0, 2],
            [-8, 0, -2], [-6, 0, -6], [-2, 0, -8],
            [2, 0, -8], [6, 0, -6], [8, 0, -2],
            [0,1.5,0]
        );
        this.arrays.normal = Vector3.cast(
            [6, 1, 1.5], [4.5, 1, 4.5], [1.5, 1, 6],
            [-1.5, 1, 6], [-4.5, 1, 4.5], [-6, 1, 1.5],
            [-6, 1, -1.5], [-4.5, 1, -4.5], [-1.5, 1, -6],
            [1.5, 1, -6], [4.5, 1, -4.5], [6, 1, -1.5],
            [8, 0, 2], [6, 0, 6], [2, 0, 8],
            [-2, 0, 8], [-6, 0, 6], [-8, 0, 2],
            [-8, 0, -2], [-6, 0, -6], [-2, 0, -8],
            [2, 0, -8], [6, 0, -6], [8, 0, -2],
            [0,1.5,0]
        );
        this.indices.push(
            1,2,24,
            2,3,24,
            3,4,24,
            4,5,24,
            5,6,24,
            6,7,24,
            7,8,24,
            8,9,24,
            9,10,24,
            10,11,24,
            11,0,24,
            0,1,24,
            0,12,1,
            1,12,13,
            1,13,2,
            2,13,14,
            2,14,3,
            3,14,15,
            3,15,4,
            4,15,16,
            4,16,5,
            5,16,17,
            5,17,6,
            6,17,18,
            6,18,7,
            7,18,19,
            7,19,8,
            8,19,20,
            8,20,9,
            9,20,21,
            9,21,10,
            10,21,22,
            10,22,11,
            11,22,23,
            11,23,0,
            0,23,12
        );
    }
}
class EvilEye extends Shape {
    constructor() {
        super("position", "normal");
        this.arrays.position = Vector3.cast(
            [0,0,0], [-3,3,0], [-3,0.5,0], [-2.5,0,0],
            [0,0,1], [-3,3,1], [-3,0.5,1], [-2.5,0,1]
        );
        this.arrays.normal = Vector3.cast(
            [0,0,0], [0,3,-3], [0,0.5,-3], [0,0,2.5],
            [0,0,1], [-3,3,1], [-3,0.5,1], [-2.5,0,1]
        );

        this.indices.push(
            0,1,3,
            1,2,3,
            4,5,7,
            5,6,7,
            0,1,4,
            1,4,5,
            1,2,5,
            2,5,6,
            2,3,6,
            3,6,7,
            3,0,4,
            3,4,7
        );
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
            'cube': new Cube(),
            'dish': new Dish(),
            'pyramid': new Pyramid_Face(),
            'trap': new Trapizoid(),

            plane: new defs.Square(),
            dome: new Dome(),
            domeCy : new Dome_Cylinder(),
            ufo: new UfoPlate(),
            evilEye: new EvilEye(),
            rock: new defs.Subdivision_Sphere(1),
            'bullet': new defs.Subdivision_Sphere(2),
            'enemy': new Enemy(),
            'text': new Text_Line(35), // change text length here
        };

        const bump = new defs.Fake_Bump_Map(1);
        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            catto: new Material(new defs.Textured_Phong, {
                color: hex_color("#000000"),
                ambient: 1.0,
                texture: new Texture("assets/powell.png")
            }),
            bullet_material: new Material(bump,
                {ambient: .4, diffusivity: .6, color: hex_color("#964B00")}),
            enemy_material: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#FF0000")}),
            rock_material: new Material(bump,
                {ambient: 0.4, diffusivity: .6, color: hex_color("#808080")}),
            mainMenu: new Material(new defs.Textured_Phong, {
                color: hex_color("#000000"),
                ambient: 1.0,
                texture: new Texture("assets/begining_screen.png")
            }),
            starBackground: new Material(new defs.Textured_Phong, {
                color: hex_color("#000000"),
                ambient: 1.0,
                texture: new Texture("assets/concept_pt_2.png")
            }),
            gameOver: new Material(new defs.Textured_Phong, {
                color: hex_color("#000000"),
                ambient: 1.0,
                texture: new Texture("assets/popcat.jpg")
            }),

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
        this.enemy_spawn_time = 200;


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
        // this.mainscreen = true;
        this.gameStarted = false;

        // TODO consider using something else for timing
        this.counter = 0;
        this.transition_counter = 0;
        this.bullet_counter = 0;
        this.enemy_counter = 0;
        this.spawn_counter = 0;

        this.enemy_speed = 60;

        // TODO for testing purposes
        this.spawn = false;

        // for keeping track of score
        this.score = 0;

        // level variables
        this.level = 1;
        this.transition = false; // for transition screen ("Next level: x")
        this.gameover = false;
        this.threshold = 7; // # of enemies to be killed before next level
        this.wave_num = 1; // # of "waves" to spawn in each level
        this.enemies_killed = 0;

        this.bullet_cooldown = 10;
        this.top_scores = [];

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
            if (!this.stopped && this.position > -20)
                this.position = this.position - 1;
        });
        this.key_triggered_button("Right", ['d'], () => {
            if (!this.stopped && this.position < 20)
                this.position = this.position + 1;
        });
        this.key_triggered_button("Shoot", ['s'], () => {
            if (!this.stopped && this.bullet_counter == this.bullet_cooldown) {
                this.shot = true;
                this.bullet_counter = 0;
            }
        });
        this.key_triggered_button("Pause/Unpause", [' '], () =>{
            this.stopped = !this.stopped;
            this.gameStarted = true;
        });
    }

    draw_bullet(context, program_state) {
        for (let b of this.bullets) {
            this.shapes.bullet.draw(context, program_state, b.drawn_location.times(Mat4.scale(0.5, 0.5, 0.5)), this.materials.bullet_material);
        }
    }

    draw_enemy(context, program_state)
    {
        for (let b of this.enemies) {
            if (this.level < 3)
                this.draw_rock(context, program_state, b.drawn_location, b.color[0], b.rotation);
            else if (this.level < 5)
                this.draw_ufo(context, program_state, b.drawn_location);
            else if (this.level < 8)
                this.draw_amogus(context, program_state, b.drawn_location, b.color);
            else
                this.draw_amogus(context, program_state, b.drawn_location, b.color);
        }
    }


    set_amogus_color(warm) {
        let random = Math.floor(Math.random() * 5);
        if (warm)
            switch(random) {
                case 0:
                    return ["#c51111", "#7a0838"];
                case 1:
                    return ["#ed54ba", "#ab2bad"];
                case 2:
                    return ["#ef7d0d", "#b33e15"];
                case 3:
                    return ["#f5f557", "#c28722"];
                case 4:
                    return ["#71491e", "#5e2615"];
            }
        else
            switch(random) {
                case 0:
                    return ["#132ed1", "#09158e"];
                case 1:
                    return ["#117f2d", "#0a4d2e"];
                case 2:
                    return ["#38fedc", "#24a8be"];
                case 3:
                    return ["#50ef39", "#15a742"];
                case 4:
                    return ["#6b2fbb", "#3b177c"];
            }
    }

    draw_amogus(context, program_state, model_transform, color) {
        // Feet
        this.shapes.cube.draw(context, program_state,
            model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(-2.5,0,0))                               // Left Foot
                .times(Mat4.scale(1.5,1.5,1.5)),
            this.materials.plastic.override({color:hex_color(color[0])}));
        this.shapes.cube.draw(context, program_state,                                               // Right Foot
            model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(2.5,0,0))
                .times(Mat4.scale(1.5,1.5,1.5)),
            this.materials.plastic.override({color:hex_color(color[0])}));

        // Body
        this.shapes.cube.draw(context, program_state,
            model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(0,5.5,0))
                .times(Mat4.scale(4, 4.5, 1.5)),
            this.materials.plastic.override({color:hex_color(color[0])}));

        // Backpack
        this.shapes.cube.draw(context, program_state,
            model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(5.5,4.5,0))
                .times(Mat4.scale(1.5, 3, 1)),
            this.materials.plastic.override({color:hex_color(color[1])}));

        // Visor
        this.shapes.cube.draw(context, program_state,
            model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(-2.5,6,0))
                .times(Mat4.scale(2.5, 1.5, 2 )),
            this.materials.plastic.override({color:hex_color("#9dc1d1")}));
    }

    set_rock_color() {
        let random = Math.floor(Math.random() * 4);
        switch(random) {
            case 0:
                return '#262626';
            case 1:
                return '#5400D7';
            case 2:
                return '#607BF7';
            case 3:
                return '#F2FDFF';
        }
    }
    draw_rock(context, program_state, model_transform, color, rotation) {
        let rock_transform = model_transform.times(Mat4.rotation(rotation, 0, 1, 0));
        this.shapes.rock.draw(context, program_state, rock_transform,
            this.materials.rock_material.override({color:hex_color(color)}));
    }

    draw_ufo(context, program_state, model_transform) {
        // Base
        let ufo_base_transform = model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(0,-1.5,0));
        this.shapes.ufo.draw(context, program_state,                                                // Top Plate
            ufo_base_transform.times(Mat4.scale(.85,1.5,.85)),
            this.materials.plastic.override({color:hex_color("#ffffff")}));
        this.shapes.ufo.draw(context, program_state,                                                // Bottom Plate
            ufo_base_transform.times(Mat4.scale(.85,1,.85))
                .times(Mat4.rotation(Math.PI,1,0,0)),
            this.materials.plastic.override({color:hex_color("#a8a8a8")}));

        // Lights
        for (let i = 0; i < 4; i = i + 1) {
            this.shapes.cube.draw(context, program_state,
                ufo_base_transform.times(Mat4.rotation(Math.PI * i / 4, 0, 1, 0)
                    .times(Mat4.scale(0.5,0.5,7.2))),
                this.materials.plastic.override({color:hex_color("#fff98f")}));
        }

        // Dome
        let ufo_dome_transform = model_transform.times(Mat4.scale(0.2, 0.2, 0.2));
        this.shapes.domeCy.draw(context,program_state, ufo_dome_transform,                          // Cylinder Part
            this.materials.plastic.override({color:hex_color("#91ddf2")}));
        this.shapes.dome.draw(context, program_state,                                               // Round Part
            ufo_dome_transform.times(Mat4.translation(0,1.5,0)),
            this.materials.plastic.override({color:hex_color("#91ddf2")}));

        // Face
        let ufo_face_transform = model_transform.times(Mat4.scale(0.2, 0.2, 0.2)).times(Mat4.translation(0,0.5,3))
            .times(Mat4.scale(.5,.5,1.25));
        this.shapes.evilEye.draw(context, program_state,                                            // Left Eye
            ufo_face_transform.times(Mat4.translation(-1,0,0)),
            this.materials.plastic.override({color:hex_color("#ff0000")}));
        this.shapes.evilEye.draw(context, program_state,                                            // Right Eye
            ufo_face_transform.times(Mat4.translation(1,0,0))
                .times(Mat4.scale(-1,1,1)),
            this.materials.plastic.override({color:hex_color("#ff0000")}));
    }

    draw_player(context, program_state, model_transform) {
        // Window
        this.shapes.cube.draw(context, program_state,                                               // Block
            model_transform.times(Mat4.scale(1,2,1)),
            this.materials.plastic.override({color:hex_color("#4E67A2")}));
        this.shapes.plane.draw(context, program_state,                                              // Cat
            model_transform.times(Mat4.translation(0,2.01,0))
                .times(Mat4.rotation(Math.PI/2,1,0,0))
                .times(Mat4.rotation(Math.PI,0,0,1)),
            this.materials.catto);

        // Body
        this.shapes.cube.draw(context, program_state,                                               // Top Half
            model_transform.times(Mat4.translation(0,0,-1))
                .times(Mat4.scale(2,1.5,1)),
            this.materials.plastic.override({color:hex_color("#F2FDFF")}));

        this.shapes.cube.draw(context, program_state,                                               // Bottom Half
            model_transform.times(Mat4.translation(0,0,1.5))
                .times(Mat4.scale(2,1.5,1.5)),
            this.materials.plastic.override({color:hex_color("#73A3D7")}));

        this.shapes.trap.draw(context, program_state,
            model_transform.times(Mat4.translation(0,0,3))                                  // Engine Bit (TODO: FIX SHAPE)
                .times(Mat4.rotation(Math.PI/2,1,0,0)),
            this.materials.plastic.override({color:hex_color("#73A3D7")}));

        // Dish
        let dish_transform = model_transform.times(Mat4.translation(0,0,-2));
        this.shapes.cube.draw(context, program_state,                                               // Dish Connector
            dish_transform.times(Mat4.scale(0.5,0.5,0.5)),
            this.materials.plastic.override({color:hex_color("#545454")}));
        dish_transform = dish_transform.times(Mat4.translation(0,0,-0.5))
            .times(Mat4.rotation(-Math.PI/2,1,0,0));
        this.shapes.dish.draw(context, program_state, dish_transform,                               // Dish
            this.materials.plastic.override({color:hex_color("#D1E1FF")}));
        this.shapes.pyramid.draw(context, program_state,                                            // Antena
            dish_transform.times(Mat4.translation(0,0.01,0))
                .times(Mat4.scale(1.5,2.25,1.5)),
            this.materials.plastic.override({color:hex_color("#BCAFFA")}));

        // Wings
        this.shapes.cube.draw(context, program_state,                                               // Connectors
            model_transform.times(Mat4.scale(2.5,0.25,0.5)),
            this.materials.plastic.override({color:hex_color("#545454")}));
        for (let i = 0; i < 3; i++) {                                                               // Wing Panels
            let wing_shift = 3.25 + 1.5 * i;
            for ( let j = 0; j < 2; j++) {
                this.shapes.cube.draw(context, program_state,
                    model_transform.times(Mat4.translation(wing_shift, 0, 0.5 * (-1)** j))
                        .times(Mat4.scale(0.75, 0.5, 0.5)),
                    this.materials.plastic.override({color: hex_color("#4DB5F7")}));

                this.shapes.cube.draw(context, program_state,
                    model_transform.times(Mat4.translation(-wing_shift, 0, 0.5 * (-1)** j))
                        .times(Mat4.scale(0.75, 0.5, 0.5)),
                    this.materials.plastic.override({color: hex_color("#4DB5F7")}));
            }
        }
    }

    add_bullet(position)
    {
        this.bullets.push(new Body(this.shapes.bullet, this.materials.bullet_material, vec3(0.5, 0.5, 0.5))
            .emplace(Mat4.translation(position, this.bottom_of_screen, 0), this.bullet_velocity, 0));
        let a = this.bullets.at(this.bullets.length-1);
        a.inverse = Mat4.inverse(a.drawn_location);
    }

    add_enemy(position)
    {
        let col = [];
        let rot = 0;
        if (this.level < 3)
            rot = Math.PI * Math.random();
        if (this.level < 5)
            col = [this.set_rock_color()];
        else if (this.level < 8)
            col = this.set_amogus_color(true);
        else
            col = this.set_amogus_color(false);
        this.enemies.push(new Body(this.shapes.enemy, this.materials.enemy_material, vec3(1, 1, 1))
            .emplace(Mat4.translation(position, this.top_of_screen, 0), this.enemy_velocity, 0, col, rot));
        let a = this.enemies.at(this.enemies.length-1);
        a.inverse = Mat4.inverse(a.drawn_location);
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
        for (let a of this.bullets)
        {
            for (let b of this.enemies)
            {
                // if bullet has collided with enemy
                if (a.check_if_colliding(b, collider))
                {
                    this.remove_bullet(this.bullets.indexOf(a));
                    this.remove_enemy(this.enemies.indexOf(b));
                    this.score = this.score+1;
                    this.enemies_killed = this.enemies_killed + 1;
                }
            }
            if (a.drawn_location[1][3] > this.top_of_screen+2)
                this.remove_bullet(this.bullets.indexOf(a));
        }
    }

    check_gameover() {
        for (let b of this.enemies) {
            if (b.drawn_location[1][3] < this.bottom_of_screen + 3) {
                this.remove_enemy(this.enemies.indexOf(b));
                // TODO LOSE CONDITION
                this.gameover = true;
                console.log("gameover");
            }
        }
    }

    // for game over/reset game
    // reset all vals
    reset_game() {
        // position of cat
        this.position = 0;

        // for spawning new bullets
        this.shot = false;

        this.stopped = true;
        // this.mainscreen = true;
        this.gameStarted = false;

        // TODO consider using something else for timing
        this.counter = 0;
        this.transition_counter = 0;
        this.bullet_counter = 0;
        this.enemy_counter = 0;
        this.spawn_counter = 0;

        this.enemy_speed = 60;
        this.wave_num = 1;
        this.enemies_killed = 0;

        // TODO for testing purposes
        this.spawn = false;

        // for keeping track of score
        this.score = 0;

        // level variables
        this.level = 1;
        this.transition = false; // for transition screen ("Next level: x")
        this.gameover = false;

        // clean up previous enemies & bullets
        for (let i = this.enemies.length-1; i>=0; i--)
        {
            this.remove_enemy(i);
        }
        for (let i = this.bullets.length-1; i>=0; i--)
        {
            this.remove_bullet(i);
        }
    }

    update_state()
    {
        for (let a of this.bullets)
        {
            a.drawn_location = a.drawn_location.times(Mat4.translation(0, 1, 0));
            a.inverse = Mat4.inverse(a.drawn_location);
        }
        this.update_enemy_state();
    }

    update_enemy_state()
    {
        if (this.enemy_counter < this.enemy_speed)
            this.enemy_counter = this.enemy_counter + 1;
        else {
            this.enemy_counter = 0;
            this.update_spawn_counter();
        }
        for (let b of this.enemies) {
            if (this.enemy_counter < this.enemy_speed/2) {
                b.drawn_location = b.drawn_location.times(Mat4.translation(1 / 10, 0, 0));
            }
            else if (this.enemy_counter >= this.enemy_speed/2 & this.enemy_counter != this.enemy_speed) {
                b.drawn_location = b.drawn_location.times(Mat4.translation(-1 / 10, 0, 0));
            }
            else
                b.drawn_location = b.drawn_location.times(Mat4.translation(0, -1, 0));

            b.inverse = Mat4.inverse(b.drawn_location);
        }
    }

    // for spawning (adding buffer time before next wave is spawned)
    update_spawn_counter()
    {
        if (this.spawn_counter < 2)
            this.spawn_counter = this.spawn_counter + 1;
        else
            this.spawn_counter = 0;
    }

    cooling_bullet()
    {
        if (this.bullet_counter != this.bullet_cooldown)
        {
            this.bullet_counter = this.bullet_counter + 1;
        }
    }

    display(context, program_state) {
        super.display(context, program_state);
        let model_transform = Mat4.identity();

        // game has not started yet, display main screen
        if (!this.gameStarted) {
            // let center = Mat4.identity().times(Mat4.translation(-5, this.top_of_screen-6, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
            // let start_string = "Cat Invaders";
            // this.shapes.text.set_string(start_string, context.context);
            // this.shapes.text.draw(context, program_state, center, this.text_image);

            this.shapes.plane.draw(context, program_state,                                              // Cat
                model_transform.times(Mat4.translation(0,8,0)).times(Mat4.scale(23,23,0)),
                this.materials.mainMenu);

            let center = Mat4.identity().times(Mat4.translation(-7, this.top_of_screen-15, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
            let space_string = "Press space to start";
            this.shapes.text.set_string(space_string, context.context);
            this.shapes.text.draw(context, program_state, center, this.text_image);
        }
        else {
            // increase by 1 level and start transition
            if (!this.transition && this.enemies_killed === (this.threshold))
            {
                this.enemy_speed = this.enemy_speed - 4;
                this.level = this.level + 1;
                this.transition = true;
                this.counter = 0;
                this.wave_num = this.level;
                this.enemies_killed = 0;
                this.threshold = this.wave_num * 7;
                // console.log(this.enemies_killed + " " + (this.wave_num * 7));
            }

            // if transitioning, increment the transition counter
            // otherwise increment the normal counter
            // CANNOT PAUSE ON TRANSITION OR GAME OVER
            if (this.transition || this.gameover)
            {
                this.transition_counter = this.transition_counter + 1;
            }
            else if (!this.stopped)
            {
                this.counter = this.counter + 1;
            }

            // background
            this.shapes.plane.draw(context, program_state,                                              // Cat
                model_transform.times(Mat4.translation(0,8,-.75)).times(Mat4.scale(23,23,0)),
                this.materials.starBackground);

            // If either normal gameplay or paused
            // display the blocks in the back
            // if normal gameplay, also do all the updates
            if (!this.transition && !this.gameover)
            {
                // move blocks & stuff
                if (this.stopped)
                {
                    // note: 3 in the z coordinate so that text shows up *on top* of any other items
                    let center = Mat4.identity().times(Mat4.translation(-8, (this.top_of_screen-this.bottom_of_screen) / 2, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
                    let start_string = "Press space to continue.";
                    this.shapes.text.set_string(start_string, context.context);
                    this.shapes.text.draw(context, program_state, center, this.text_image);
                }
                else
                {
                    if (this.shot) {
                        this.shot = false;
                        this.add_bullet(this.position);
                    }
                    //if (this.spawn)
                    //if ((this.counter % this.enemy_spawn_time) == 0) {
                    if (this.wave_num != 0 && this.enemy_counter == 0 && this.spawn_counter == 1) {
                        this.wave_num = this.wave_num - 1;
                        // spawn enemies in a row
                        for (let i = -12; i < 13; i += 4) {
                            this.add_enemy(i);
                        }
                    }
                    this.update_state();
                    this.check_collisions();
                    this.check_gameover();
                    this.cooling_bullet();
                }
                model_transform = model_transform.times(Mat4.translation(this.position, 0, 0));
                this.draw_player(context, program_state, model_transform
                    .times(Mat4.scale(0.5,0.5,0.5))
                    .times(Mat4.rotation(Math.PI/2,1,0,0)));
                this.draw_bullet(context, program_state);
                this.draw_enemy(context, program_state);
            }
            else if (this.transition)
            {
                let center = Mat4.identity().times(Mat4.translation(-6, (this.top_of_screen-this.bottom_of_screen) / 2, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
                let start_string = "Next Level: " + this.level;
                this.shapes.text.set_string(start_string, context.context);
                this.shapes.text.draw(context, program_state, center, this.text_image);
                // after some time, return to normal gameplay
                if (this.transition_counter == 200)
                {
                    this.transition = false;
                    this.transition_counter = 0;
                }
            }
            else if (this.gameover)
            {
                let center = Mat4.identity().times(Mat4.translation(-10, this.top_of_screen-6, 3)).times(Mat4.scale(0.5, 0.5, 0.5));
                let gameover_string = "Game Over! Main Menu in a few secs...";
                this.shapes.text.set_string(gameover_string, context.context);
                this.shapes.text.draw(context, program_state, center, this.text_image);

                // game over screen
                this.shapes.plane.draw(context, program_state,                                              // Cat
                    model_transform.times(Mat4.translation(0,8,0)).times(Mat4.scale(23,23,0)),
                    this.materials.gameOver);

                // add score to list of scores (once)
                if (this.score != 0)
                {
                    this.top_scores.push(this.score);
                    this.top_scores.sort();
                    this.score = 0;
                }

                // display top 10
                center = center.times(Mat4.translation(0, -4, 0));
                if (this.top_scores.length > 0) {
                    this.shapes.text.set_string("Top 10 scores: ", context.context);
                    this.shapes.text.draw(context, program_state, center, this.text_image);
                    center = center.times(Mat4.translation(0, -2, 0));
                    center = center.times(Mat4.scale(0.75, 0.75, 0.75));
                    for (let i = 1; i <= this.top_scores.length && i <= 10; i++) {
                        center = center.times(Mat4.translation(0, -2, 0));
                        let score_string = i + ". " + this.top_scores[i - 1];
                        this.shapes.text.set_string(score_string, context.context);
                        this.shapes.text.draw(context, program_state, center, this.text_image);
                    }
                }
                else {
                    this.shapes.text.set_string("No top scores yet!", context.context);
                    this.shapes.text.draw(context, program_state, center, this.text_image);
                }

                if (this.transition_counter == 200) {
                    this.reset_game();
                    this.transition_counter = 0;
                }
            }

            // displaying score
            let top_left = Mat4.identity().times(Mat4.translation(-18, this.top_of_screen, 3)).times(Mat4.scale(0.3, 0.3, 0.3));
            let score_string = "Score: " + this.score;
            this.shapes.text.set_string(score_string, context.context);
            this.shapes.text.draw(context, program_state, top_left, this.text_image);

            // displaying current level
            let middle = Mat4.identity().times(Mat4.translation(-2, this.top_of_screen, 3)).times(Mat4.scale(0.3, 0.3, 0.3));
            let lvl_string = "Level: " + this.level; // + " # of bullets: " + this.bullets.length; // TODO remove testing
            this.shapes.text.set_string(lvl_string, context.context);
            this.shapes.text.draw(context, program_state, middle, this.text_image);
        }

    }
}