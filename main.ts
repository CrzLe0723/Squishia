// Squishia 1
// Game Type: ARPG (maybe Metroidvania later)
// Story: ___

// Notes here:


/**
 * Ideas:
 *
 */

/**
 * Inspiration:
 *
 */

/**
 *
 * Extensions right now:
 *
 * Darts
 * Sprite Sight https://github.com/felixtsu/pxt-sight
 * Scaling
 * Sprite Utils https://github.com/jwunderl/arcade-sprite-util
 * CollisionHandler https://github.com/Sonicblaston62/Sprite-Walls
 * TileXtra https://github.com/LautaroCeballos/Tiles-Animator
 * Path-Following https://github.com/jwunderl/arcade-tilemap-a-star
 * Tile-Data https://github.com/neintoes/arcade-tile-data
 * Status-Bars
 * Color
 * Achievements https://github.com/codinggrizzlybear/better-better-achievements
 * BetterSettings https://github.com/sargedev/bettersettings
 * Inventory https://github.com/UnsignedArduino/Inventory
 * Timer
 * Scroller
 * Character
 * Fancy Text https://github.com/riknoll/arcade-fancy-text
 * Effects https://github.com/alexszeto/extra-effects
 * Mini Menu https://github.com/riknoll/arcade-mini-menu
 * Mini Menu Cursor https://github.com/WoofWoofCodes/pxt-mini-menu-cursor
 * Minimap
 * Overworld  https://github.com/riknoll/arcade-overworld
 * Rpg  https://github.com/riknoll/arcade-rpg
 * Transitions https://github.com/riknoll/arcade-screen-transitions
 * Shader https://github.com/riknoll/arcade-shader
 * Sound https://github.com/riknoll/arcade-sound-instructions
 * Sprite Events https://github.com/riknoll/arcade-sprite-events
 * State  https://github.com/riknoll/arcade-state-transitions
 * Story
 * Text Sprite
 * Tile Scanner riknoll/arcade-tile-scanner
 * Tile Util
 * Browser Events
 * Lantern https://github.com/felixtsu/pxt-lantern
 * Sprite Fx
 * Improved Sprite Data https://github.com/riknoll/arcade-improved-sprite-data
 * Rttl https://github.com/pelikhan/pxt-rtttl
 * Random https://github.com/UnsignedArduino/Fast-Random-Blocks
 * Background FX https://github.com/gasanchik/pxt-imgfx
 * MathX https://github.com/CrzLe0723/MathX
 * RetroFX https://github.com/CrzLe0723/RetroFx
 * Transparency https://github.com/rando-muser/arcade-transparency
 *
 */










// Namespaces
namespace SpriteKind {
    export const helper = SpriteKind.create()
    export const map = SpriteKind.create()
    export const NPC = SpriteKind.create()
    export const hut = SpriteKind.create()
    export const furniture = SpriteKind.create()
    export const Gemstone = SpriteKind.create()
    export const Sword = SpriteKind.create()
    export const Elder = SpriteKind.create()
    export const screen = SpriteKind.create()
    export const slimy = SpriteKind.create()
    export const SwordTrail = SpriteKind.create()
}
namespace StatusBarKind {
    export const Compatriot_HP = StatusBarKind.create()
    export const slimyhealth = StatusBarKind.create()
}

namespace userconfig {
    export const ARCADE_SCREEN_WIDTH = 320
    export const ARCADE_SCREEN_HEIGHT = 240
}



// Enums 
enum SwordPhase {
    Approach,
    FlyAway,
    Return,
    Impact,
    Done
}
// Types 


// Interfaces



// Classes


// Generics



// Vars



// Arrays 

// Sprite Arrays 


// String Arrays 


// Num Arrays 


// Bool Arrays

// Image Arrays


// Enum Arrays 

// Interface Arrays 

// Type Arrays 

// Generic Arrays 

// Class Arrays 

// Setting Arrays 

// Dictionaries 

// Function Arrays 

// 3d Arrays



// Sprite 


let settingsmenu: Sprite = null
let slimy2: Sprite = null

let entity: Sprite = null
let Ockey_upgrade_menu: Sprite = null
let projectile: Sprite = null


let ockey: Sprite = null
let hero: Sprite = null

let Sword1: Sprite = null
let Sword2: Sprite = null

// Statusbar Sprite 
let statusbar: StatusBarSprite = null
let slimystatusbar: StatusBarSprite = null

// Inventory Sprite 
let inventory: Inventory.Inventory = null

// String 


// Num 

let t: number = 0
let e: number = 0

let spin1: number = 180
let spin2: number = 270

let startX1: number = 0
let startY1: number = 0
let startX2: number = 0
let startY2: number = 0

let impactTimer: number = 0

let coins: number = 0
let state: number = 0

let flare_duration: number = 0
let player_dir: number = 0

// Bool 

let DEBUG: boolean = false
let herohassword: boolean = false
let playerHasTalkedToNPC4: boolean = false

// Image 

// Enum Vars

let phase: SwordPhase = SwordPhase.Done


// Interface Vars 

// Type Vars 

// Generic Vars

// Class Vars 

// Setting Vars 


// Function Vars 




game.setDialogCursor(assets.image`saplingcursor`)
game.splash("100 years after the great hero Samknight saved the world, the Dark Lord's son, Malice, took over the land. Squishy is one of her kingdom's strongest warriors, and Squishy has been sent on a mission by the queen of your kingdom to go find Malice and kill him.")
hero = sprites.create(assets.image`squishy`, SpriteKind.Player)
state = Enum.enumVar("game state", "cutscene")
coins = 200
ockey = sprites.create(assets.image`ockey`, SpriteKind.helper)
let slimy_attacking = false
player_dir = Enum.enumVar("dir", "up")
flare_duration = 100
let flare_power = 4
herohassword = false
let ockeyisattacking = false
init_inventory()
ockey.setPosition(hero.x + 15, hero.x + 15)
animation.runImageAnimation(
ockey,
assets.animation`ockeyidle`,
500,
true
)
scene.cameraFollowSprite(hero)
tiles.setCurrentTilemap(tilemap`level1`)
story.startCutscene(function () {
    story.printCharacterText("Okay! How are we going to find the Malice?", "Squishy")
    story.printCharacterText("We could just wander around until we find him?", "Ockey")
    hero.setImage(assets.image`squishybored`)
    story.printCharacterText("We need to actually find him, Ockey.", "Squishy")
    story.printCharacterText("Well we could start by getting out of this sand dungeon.", "Ockey")
    story.printCharacterText("How did we even get down here?", "Squishy")
    story.printCharacterText("But anyway I saw an exit close by.", "Squishy")
    story.printCharacterText("You can move with arrow keys, by the way. Or WASD if you prefer.", "Ockey")
    music.setVolume(50)
    music.play(music.createSong(assets.song`Powerup_theme`), music.PlaybackMode.UntilDone)
    story.printCharacterText("Who are you talking to?", "Squishy")
    story.cancelAllCutscenes()
    state = Enum.enumVar("game state", "playing")
    HP()
    info.setScore(coins)
    music.setVolume(20)
    music.play(music.createSong(assets.song`grass theme`), music.PlaybackMode.LoopingInBackground)
})

// Events
game.onUpdate(function () {

    if (phase == SwordPhase.Approach) {

        t += 0.03
        e = ease(t)

        // Sword 1
        Sword1.x = -25 + 105 * e
        Sword1.y = 82 + Math.sin(e * Math.PI) * 25 + (60 - 82) * e

        spriteFx.setRotation(
            Sword1,
            180 - 220 * e + 40 * Math.sin(e * Math.PI)
        )


        // Sword 2
        Sword2.x = 185 - 105 * e
        Sword2.y = 82 + Math.sin(e * Math.PI) * 25 + (60 - 82) * e

        spriteFx.setRotation(
            Sword2,
            270 - 270 * e - 30 * Math.sin(e * Math.PI)
        )

        if (t >= 1) {
            phase = SwordPhase.FlyAway

            Sword1.vx = 130
            Sword1.vy = -35

            Sword2.vx = -130
            Sword2.vy = -35

            spin1 = 0
            spin2 = 0


            timer.after(2000, function () {

                startX1 = Sword1.x
                startY1 = Sword1.y

                startX2 = Sword2.x
                startY2 = Sword2.y

                Sword1.vx = 0
                Sword1.vy = 0
                Sword2.vx = 0
                Sword2.vy = 0

                t = 0
                phase = SwordPhase.Return
            })
        }
    }


    if (phase == SwordPhase.FlyAway) {

        spin1 += 35
        spin2 -= 35

        spriteFx.setRotation(Sword1, spin1)
        spriteFx.setRotation(Sword2, spin2)

        if (game.runtime() % 8 == 0) {
            createSwordGhost(Sword1, spin1)
            createSwordGhost(Sword2, spin2)
        }

        if (game.runtime() % 10 == 0) {
            createSwordTrail(
                Sword1.x,
                Sword1.y,
                spin1
            )

            createSwordTrail(
                Sword2.x,
                Sword2.y,
                spin2
            )
        }

    }


    if (phase == SwordPhase.Return) {

        if (t < 0.8) {
            t += 0.03
        } else {
            t += 0.01
        }
        e = ease(t)


        Sword1.x = startX1 + (80 - startX1) * e
        Sword2.x = startX2 + (80 - startX2) * e


        // smaller dip so they line up better
        Sword1.y =
            startY1 +
            (60 - startY1) * e +
            Math.sin(e * Math.PI) * 25

        Sword2.y =
            startY2 +
            (60 - startY2) * e +
            Math.sin(e * Math.PI) * 25


        spriteFx.setRotation(
            Sword1,
            180 - 180 * e + 40 * Math.sin(e * Math.PI)
        )

        spriteFx.setRotation(
            Sword2,
            270 - 270 * e - 40 * Math.sin(e * Math.PI)
        )
        if (game.runtime() % 5 == 0) {
            createSwordGhost(
                Sword1,
                180 - 180 * e
            )

            createSwordGhost(
                Sword2,
                270 - 270 * e
            )
        }

        if (game.runtime() % 6 == 0) {
            createSwordTrail(
                Sword1.x,
                Sword1.y,
                180 - 180 * e
            )

            createSwordTrail(
                Sword2.x,
                Sword2.y,
                270 - 270 * e
            )
        }
        if (t >= 1) {
            phase = SwordPhase.Impact
            impactTimer = 0
        }

    }

    if (phase == SwordPhase.Impact) {

        impactTimer += 1

        // Small pause before the flash
        if (impactTimer == 1) {
            scene.cameraShake(4, 300)
            color.startFadeFromCurrent(color.White, 300)
        }


        // Freeze swords during impact
        Sword1.x = 78
        Sword2.x = 84

        if (impactTimer >= 20) {
            phase = SwordPhase.Done
        }
    }
})

game.onUpdateInterval(2000, function () {
    if (state == Enum.enumVar("game state", "playing")) {
        if (tileUtil.currentTilemap() == tilemap`cave`) {
            slimy2 = sprites.create(assets.image`slimy`, SpriteKind.slimy)
            slimy2.follow(hero, 20)
            animation.runImageAnimation(
                slimy2,
                assets.animation`slime walking`,
                500,
                true
            )
            slimystatusbar = statusbars.create(20, 4, StatusBarKind.slimyhealth)
            slimystatusbar.value = 10
            slimystatusbar.attachToSprite(slimy2)
        }
    }
})

forever(function () {
    if (state == Enum.enumVar("game state", "playing")) {
        controller.moveSprite(hero, 75, 75)
    } else {
        controller.moveSprite(hero, 0, 0)
    }
})
forever(function () {
    ockey.follow(hero, 75)
    if (player_dir == Enum.enumVar("dir", "up")) {
        ockey.y = hero.y + 15
    }
    if (player_dir == Enum.enumVar("dir", "down")) {
        ockey.y = hero.y - 15
    }
    if (player_dir == Enum.enumVar("dir", "left")) {
        ockey.x = hero.x + 15
    }
    if (player_dir == Enum.enumVar("dir", "right")) {
        ockey.x = hero.x - 15
    }
})

forever(function () {
    if (DEBUG) {
        hero.sayText("Game: " + Enum.enumStr("game state", state) + ", Direction:" + Enum.enumStr("dir", player_dir), 150, false)
    }
})

controller.combos.attachCombo("A B", function () {
    if (state == Enum.enumVar("game state", "playing")) {
        animation.runImageAnimation(
            ockey,
            assets.animation`ockeyflare`,
            200,
            false
        )
        if (player_dir == Enum.enumVar("dir", "right")) {
            projectile = sprites.createProjectileFromSprite(assets.image`flare`, ockey, 100, 0)
        } else if (player_dir == Enum.enumVar("dir", "down")) {
            projectile = sprites.createProjectileFromSprite(assets.image`flareup`, ockey, 0, -100)
        } else if (player_dir == Enum.enumVar("dir", "up")) {
            projectile = sprites.createProjectileFromSprite(assets.image`flaredown`, ockey, 0, 100)
        } else if (player_dir == Enum.enumVar("dir", "left")) {
            projectile = sprites.createProjectileFromSprite(assets.image`flareright`, ockey, -100, 0)
        }
        music.play(music.createSoundEffect(
            WaveShape.Noise,
            924,
            1222,
            255,
            255,
            flare_duration,
            SoundExpressionEffect.None,
            InterpolationCurve.Linear
        ), music.PlaybackMode.InBackground)
        timer.after(flare_duration, function () {
            animation.runImageAnimation(
                ockey,
                assets.animation`ockeyidle0`,
                500,
                true
            )
            sprites.destroy(projectile)
        })
    }
})


controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "in inventory")) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.max(inventory.get_number(InventoryNumberAttribute.SelectedIndex) - 8, 0))
    } else if (state == Enum.enumVar("game state", "playing")) {
        hero.setImage(assets.image`herolookup`)
        player_dir = Enum.enumVar("dir", "up")
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "in inventory")) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.max(inventory.get_number(InventoryNumberAttribute.SelectedIndex) - 1, 0))
    } else if (state == Enum.enumVar("game state", "playing")) {
        hero.setImage(assets.image`herolookleft`)
        player_dir = Enum.enumVar("dir", "left")
    }
})


controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "in inventory")) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.min(inventory.get_number(InventoryNumberAttribute.SelectedIndex) + 1, inventory.get_items().length - 1))
    } else if (state == Enum.enumVar("game state", "playing")) {
        hero.setImage(assets.image`herolookright`)
        player_dir = Enum.enumVar("dir", "right")
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "in inventory")) {
        if (inventory.get_items()[inventory.get_number(InventoryNumberAttribute.SelectedIndex)]) {

        }
        inventory.update()
    } else if (state == Enum.enumVar("game state", "playing")) {
        if (herohassword) {
            Attack()
        }
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "playing")) {
        state = Enum.enumVar("game state", "in menu")
        create_menu()
    } else if (state == Enum.enumVar("game state", "in inventory")) {
        show_inventory(false)
        state = Enum.enumVar("game state", "playing")
    } else if (state == Enum.enumVar("game state", "in menu")) {
        miniMenu.close(settingsmenu)
        state = Enum.enumVar("game state", "playing")
    }
})


controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "in inventory")) {
        show_inventory(false)
        state = Enum.enumVar("game state", "in menu")
    } else if (state == Enum.enumVar("game state", "in menu")) {
        sprites.destroy(settingsmenu)
        state = Enum.enumVar("game state", "playing")
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (state == Enum.enumVar("game state", "in inventory")) {
        inventory.set_number(InventoryNumberAttribute.SelectedIndex, Math.min(inventory.get_number(InventoryNumberAttribute.SelectedIndex) + 8, inventory.get_items().length - 1))
    } else if (state == Enum.enumVar("game state", "playing")) {
        hero.setImage(assets.image`herolookdown`)
        player_dir = Enum.enumVar("dir", "down")
    }
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`cave`)
    tiles.placeOnTile(hero, tiles.getTileLocation(7, 28))
    tileUtil.coverAllTiles(assets.tile`myTile57`, assets.tile`myTile56`)
    music.stopAllSounds()
    music.play(music.createSong(assets.song`cave`), music.PlaybackMode.LoopingInBackground)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    playerHasTalkedToNPC4 = false
    story.startCutscene(function () {
        state = Enum.enumVar("game state", "cutscene")
        tiles.setCurrentTilemap(tilemap`level2`)
        tiles.placeOnRandomTile(hero, assets.tile`myTile5`)
        story.printCharacterText("Looks like we're here.", "Squishy")
        story.printCharacterText("We should probably find a town or something.", "Ockey")
        story.printCharacterText("If my memory serves, there should be a small town close to here. Southeast, I think.", "Squishy")
        music.play(music.createSong(assets.song`Powerup_theme0`), music.PlaybackMode.UntilDone)
        createvillagersfortown1()
        story.cancelAllCutscenes()
        state = Enum.enumVar("game state", "playing")
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile60`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level10`)
    tiles.placeOnTile(hero, tiles.getTileLocation(13, 48))
    music.stopAllSounds()
    music.play(music.createSong(assets.song`grass theme0`), music.PlaybackMode.LoopingInBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.NPC)
})

scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile58`, function (sprite, location) {
    tiles.setCurrentTilemap(tilemap`level2`)
    tiles.placeOnTile(hero, tiles.getTileLocation(60, 1))
    music.stopAllSounds()
    music.play(music.createSong(assets.song`grass theme`), music.PlaybackMode.LoopingInBackground)
    createvillagersfortown1()
    sprites.destroyAllSpritesOfKind(SpriteKind.slimy)
})

statusbars.onZero(StatusBarKind.slimyhealth, function (status) {
    slimy2.unfollow()
    animation.runImageAnimation(
        slimy2,
        assets.animation`slime walking`,
        500,
        false
    )
    sprites.destroy(slimy2)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.NPC, function (sprite, otherSprite) {
    state = Enum.enumVar("game state", "cutscene")
    sprite.setPosition(otherSprite.x + 16, otherSprite.y)
    story.startCutscene(function () {
        if (sprites.readDataNumber(otherSprite, "ID") == 1) {
            story.printCharacterText("Hi, welcome to our town", "Sir")
            story.printCharacterText("Uh... does your town have a name?", "Squishy")
            story.printCharacterText("Unfortunately, our town does not have a name.", "Sir")
            story.printCharacterText("Why not?", "Squishy")
            story.printCharacterText("Malice forced us to get rid of our town's original name.", "Sir")
            story.printCharacterText("That's terrible!", "Squishy")
            story.printCharacterText("Well, you're welcome to stay in our town as long as you want.", "Sir")
            story.printCharacterText("I will give you some coins for your journey.", "Sir")
            story.printCharacterText("Take care, now. I have to go home.", "Sir")
            sprites.destroy(otherSprite, effects.warmRadial, 1000)
            story.printCharacterText("Huh, looks like people can teleport in this town.", "Squishy")
            story.printCharacterText("Either that or he spontaneously combusted.", "Ockey")
            info.setScore(coins + 300)
        }
        if (sprites.readDataNumber(otherSprite, "ID") == 2) {
            story.printCharacterText("There's a cave just north of here. It has creepy monsters!")
        }
        if (sprites.readDataNumber(otherSprite, "ID") == 3) {
            story.printCharacterText("This town is really friendly. You can go into other people's houses as you please.")
        }
        if (sprites.readDataNumber(otherSprite, "ID") == 4) {
            if (!(playerHasTalkedToNPC4)) {
                playerHasTalkedToNPC4 = true
                story.printCharacterText("Hi, welcome into my house!", "Person")
                story.printCharacterText("I'm Amythest.", "Amythest")
                story.printCharacterText("I see you have a companion with you.", "Amythest")
                story.printCharacterText("If you'd like, I could help her get stronger.", "Amythest")
                story.showPlayerChoices("Sure!", "Nah")
                if (story.checkLastAnswer("Sure!")) {
                    story.printCharacterText("Great! There is a small fee, however.", "Amythest")
                    story.printCharacterText("What would you like to upgrade?", "Amythest")
                    Ockey_upgrade_shop()
                    if (true) {

                    } else if (false) {

                    } else if (story.checkLastAnswer("Actually, never mind.")) {
                        story.printCharacterText("That's alright, come back anytime!", "Amythest")
                    }
                } else if (story.checkLastAnswer("Nah")) {
                    sprites.destroy(Ockey_upgrade_menu)
                    story.printCharacterText("That's alright, come back anytime!", "Amythest")
                }
            } else {
                story.printCharacterText("What would you like to upgrade?", "Amythest")
                Ockey_upgrade_shop()
            }
        }
        if (sprites.readDataNumber(otherSprite, "ID") == 5) {
            hero.x += 10
            story.printCharacterText("Hi!! Wood yu wike some chocwitz? Thay are only 25 coins!!", "Mason")
            story.showPlayerChoices("Sure!", "Nah")
            if (story.checkLastAnswer("Sure!")) {
                story.printCharacterText("Yay!! That will be 25 coins pweez.", "Mason")
                if (coins < 25) {
                    story.printCharacterText("Euh? Yu don't hav enouff coins!", "Mason")
                } else {
                    story.printCharacterText("Ok byeee!!", "Mason")
                }
            } else if (story.checkLastAnswer("Nah")) {
                story.printCharacterText("Ok byeee!!", "Mason")
            }
        }
        if (sprites.readDataNumber(otherSprite, "ID") == 6) {
            story.printCharacterText("What story do you want to hear next?", "Daisy")
            story.showPlayerChoices("Why do we look like this?", "How do slimes spawn?")
            if (story.checkLastAnswer("Why do we look like this?")) {
                story.printCharacterText("We look like this because of one person. That person actually looks a lot like you actually.", "Daisy")
                story.printCharacterText("He could make copies of himself, and he did it pretty quickly.", "Daisy")
                story.printCharacterText("After a while, most humans went extinct while ameobple took over. ", "Daisy")
                story.printCharacterText("Now we are really the only ones left.", "Daisy")
            } else if (story.checkLastAnswer("How do slimes spawn?")) {
                story.printCharacterText("They basically coalesce from moisture and particles in the air.", "Daisy")
                story.printCharacterText("The magic in the air is making them move, but its very weak, so the slimes are slow.", "Daisy")
                story.printCharacterText("Slimes can also control the moisture, leading to them creating huge slime pillars.", "Daisy")
                story.printCharacterText("Those pillars can hurt a lot, so watch your step.", "Daisy")
            }
        }
        story.cancelAllCutscenes()
        state = Enum.enumVar("game state", "playing")
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Sword, function (sprite, otherSprite) {
    story.startCutscene(function () {
        state = Enum.enumVar("game state", "cutscene")
        story.printCharacterText("Woah, what is this??", "Squishy")
        story.printCharacterText("It looks like a sword.", "Ockey")
        story.printCharacterText("I know that! But this sword has a name! Look closely.", "Squishy")
        story.printCharacterText("\"The Molten Blade.\"", "Ockey")
        story.printCharacterText("Hey, that's got a nice ring to it!", "Ockey")
        story.printCharacterText("This could be useful... let's take it!", "Squishy")
        sprites.destroy(otherSprite)
        story.cancelAllCutscenes()
        herohassword = true
        state = Enum.enumVar("game state", "playing")
    })
})
// Functions
function ease(t: number): number {
    return t * t * (3 - 2 * t)
}
function createSwordTrail(
    x: number,
    y: number,
    rotation: number
) {

    let trail = sprites.create(
        image.create(22, 3),
        SpriteKind.SwordTrail
    )
    trail.z = -2
    trail.setPosition(
        x,
        y
    )

    spriteFx.setRotation(
        trail,
        rotation
    )

    trail.image.fill(1)

    transparency.make(
        trail,
        180
    )


    trail.setFlag(
        SpriteFlag.AutoDestroy,
        true
    )

    trail.lifespan = 150
}

function createSwordGhost(source: Sprite, rotation: number) {

    let ghost = sprites.create(
        source.image.clone(),
        SpriteKind.SwordTrail
    )

    ghost.z = -1

    ghost.setPosition(
        source.x,
        source.y
    )

    spriteFx.setRotation(
        ghost,
        rotation
    )

    ghost.scale = source.scale

    transparency.make(ghost, 100)

    ghost.setFlag(
        SpriteFlag.AutoDestroy,
        true
    )

    ghost.lifespan = 250
}
function create_menu() {
    let squishydefeatedsycamore = 0
    settingsmenu = miniMenu.createMenuFromArray([
        miniMenu.createMenuItem("Bag"),
        miniMenu.createMenuItem("How to Play"),
        miniMenu.createMenuItem("Stats"),
        miniMenu.createMenuItem("Toggle Debug: " + DEBUG),
        miniMenu.createMenuItem("Exit")
    ])
    if (squishydefeatedsycamore) {
        miniMenu.insertMenuItem(settingsmenu, miniMenu.createMenuItem("Swap to Sycamore"), 3)
    }
    miniMenu.setFrame(settingsmenu, assets.image`menuframe`)
    settingsmenu.setFlag(SpriteFlag.RelativeToCamera, true)
    miniMenu.onButtonPressed(settingsmenu, miniMenu.Button.A, function (selection, selectedIndex) {
        if (selection == "Bag") {
            state = Enum.enumVar("game state", "in inventory")
            show_inventory(true)
        }
        if (selection == "How to Play") {

        }
        if (selection == "Stats") {
            show_stats()
        }
        if (selection == "Swap to Sycamore") {

        }
        if (selection == "Toggle Debug: " + DEBUG) {
            DEBUG = !(DEBUG)
            miniMenu.getMenuItem(settingsmenu, miniMenu.getMenuItems(settingsmenu).length - 2).setText("Toggle Debug: " + DEBUG)
        }
        if (selection == "Exit") {
            miniMenu.close(settingsmenu)
            state = Enum.enumVar("game state", "playing")
        }
    })
    miniMenu.onButtonPressed(settingsmenu, miniMenu.Button.Up, function (selection, selectedIndex) {
        if (state == Enum.enumVar("game state", "in menu")) {
            miniMenu.moveSelection(settingsmenu, miniMenu.MoveDirection.Up)
        }
    })
    miniMenu.onButtonPressed(settingsmenu, miniMenu.Button.Down, function (selection, selectedIndex) {
        if (state == Enum.enumVar("game state", "in menu")) {
            miniMenu.moveSelection(settingsmenu, miniMenu.MoveDirection.Down)
        }
    })
}
function add_item_in_inventory(name: string, image2: Image) {
    inventory.get_items().push(Inventory.create_item(name, image2))
    inventory.update()
}
function createnpc4() {
    create_entity(assets.image`amythest`, SpriteKind.NPC, 4)
}
function find_value_in_inventory(name: string) {
    for (let value of inventory.get_items()) {
        if (value.get_text(ItemTextAttribute.Name) == name) {
            return inventory.get_items().indexOf(value)
        }
    }
    return -1
}

function createvillagersfortown1() {
    create_entity_on_tile(assets.image`npc`, SpriteKind.NPC, assets.tile`myTile28`, 1)
    create_entity_on_loc(assets.image`npc1`, SpriteKind.NPC, tiles.getTileLocation(47, 55), 2)
    create_entity_on_loc(assets.image`npc2`, SpriteKind.NPC, tiles.getTileLocation(59, 66), 3)
    create_entity_on_tile(assets.image`hut`, SpriteKind.hut, assets.tile`myTile9`, 1)
    create_entity_on_tile(assets.image`hut1`, SpriteKind.hut, assets.tile`myTile10`, 2)
    create_entity_on_tile(assets.image`hut2`, SpriteKind.hut, assets.tile`myTile17`, 3)
    create_entity_on_tile(assets.image`hut4`, SpriteKind.hut, assets.tile`myTile21`, 4)
    create_entity_on_loc(assets.image`hotwl`, SpriteKind.hut, tiles.getTileLocation(63, 61), 0)
    create_entity_on_loc(assets.image`moltenblade`, SpriteKind.Sword, tiles.getTileLocation(61, 1), 1)
}
function show_stats() {
    let monsters_killed = 0
    game.showLongText("Time Played: " + Math.round(game.runtime() / 1000), DialogLayout.Full)
    game.showLongText("Monsters Killed: " + monsters_killed, DialogLayout.Full)
}
function createnpc5() {
    create_entity(assets.image`mason`, SpriteKind.NPC, 5)
}
function remove_item_from_inventory(name: string) {
    inventory.get_items().removeAt(find_value_in_inventory(name))
    inventory.update()
}
function init_inventory() {
    inventory = Inventory.create_inventory([], 32)
    inventory.set_number(InventoryNumberAttribute.SelectedIndex, 0)
    inventory.set_text("Bag")
    inventory.setPosition(999, 999)
    inventory.z = 100
    inventory.setFlag(SpriteFlag.RelativeToCamera, true)
}
function show_inventory(show: boolean) {
    if (show) {
        inventory.setPosition(160, 120)
    } else {
        inventory.setPosition(999, 999)
    }
}
function create_entity(image2: Image, kind: number, id: number) {
    sprites.setDataNumber(sprites.create(image2, kind), "ID", id)
}
function createnpc6() {
    create_entity(assets.image`daisy`, SpriteKind.NPC, 6)
}
function create_entity_on_tile(image2: Image, kind: number, tile_image: Image, id: number) {
    entity = sprites.create(image2, kind)
    tiles.placeOnRandomTile(entity, tile_image)
    sprites.setDataNumber(entity, "ID", id)
}
function startIntro(): void {
    Sword1 = sprites.create(assets.image`Sword_Right`, SpriteKind.Sword)
    Sword1.setPosition(-25, 82)
    spriteFx.setRotation(Sword1, 180)
    Sword1.scale = 2
    Sword2 = sprites.create(assets.image`Sword_Left`, SpriteKind.Sword)
    Sword2.setPosition(185, 82)
    spriteFx.setRotation(Sword2, 270)
    Sword2.scale = 2
    phase = SwordPhase.Approach
    control.runInParallel(() => {

        pauseUntil(() => phase == SwordPhase.Done)
        color.pauseUntilFadeDone()

        // Dramatic pause after clash
        pause(2000)

        let myTextSprite = fancyText.create(
            "Created by Studio of Sword",
            null,
            1,
            fancyText.geometric_serif_6
        )

        myTextSprite.x = 81
        myTextSprite.y = 90

        // Start invisible/small
        myTextSprite.scale = 0


        // Fade back from white
        color.startFadeFromCurrent(color.originalPalette, 1500)


        // Title pop-in animation
        for (let i = 0; i <= 20; i++) {

            let p = i / 20
            let textEase = ease(p)

            myTextSprite.scale = textEase

            pause(30)
        }


        // Small settle animation
        for (let i = 0; i < 10; i++) {

            myTextSprite.y += Math.sin(i) * 0.5

            pause(30)
        }


        pause(500)

        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)

        timer.after(2000, () => {
            color.startFadeFromCurrent(color.Black, 2000)
            color.pauseUntilFadeDone()
        })

    })
}
function Attack() {
    if (player_dir == Enum.enumVar("dir", "up")) {
        animation.runImageAnimation(
            hero,
            assets.animation`heroattackup`,
            100,
            false
        )
    }
    if (player_dir == Enum.enumVar("dir", "down")) {
        animation.runImageAnimation(
            hero,
            assets.animation`heroattackdown`,
            100,
            false
        )
    }
    if (player_dir == Enum.enumVar("dir", "left")) {
        animation.runImageAnimation(
            hero,
            assets.animation`heroattackleft`,
            100,
            false
        )
    }
    if (player_dir == Enum.enumVar("dir", "right")) {
        animation.runImageAnimation(
            hero,
            assets.animation`heroattackright`,
            100,
            false
        )
    }
}
function Ockey_upgrade_shop() {
    let boltduration = 0
    Ockey_upgrade_menu = miniMenu.createMenuFromArray([miniMenu.createMenuItem("Make Ockey stronger: $" + flare_duration * 1.5), miniMenu.createMenuItem("Make Ockey smarter: $" + boltduration * 2)])
    miniMenu.setDimensions(Ockey_upgrade_menu, 125, 100)
    miniMenu.setTitle(Ockey_upgrade_menu, "Ockey upgrades")
    miniMenu.setFrame(Ockey_upgrade_menu, assets.image`menuframe2`)
    Ockey_upgrade_menu.top = 0
    Ockey_upgrade_menu.right = 145
}
function create_entity_on_loc(image2: Image, kind: number, location: tiles.Location, id: number) {
    entity = sprites.create(image2, kind)
    tiles.placeOnTile(entity, location)
    sprites.setDataNumber(entity, "ID", id)
}
function HP() {
    statusbar = statusbars.create(20, 4, StatusBarKind.Health)
    statusbar.max = 100
    statusbar.setColor(7, 2, 5)
    statusbar.attachToSprite(hero)
    statusbar.setBarBorder(1, 15)
    statusbar.setLabel("HP", 2)
    statusbar.value = 100
}