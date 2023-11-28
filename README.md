# UND1C1 Port

This is a port of a tabletop game about football named 'UND1C1'. I have no rights to use their name or anything else, this is just a personal project that I have made for fun and to gain some experience in web development. If you'll like what you see - consider buying original game by this link: https://www.und1c1.com/

## Trying it out
You can try out this program via GitHub Pages via this link: https://tr0f1k.github.io/UND1C1-Port/

## How It Works:

The goal of "UND1C1" is simple: like in real footbal, you have to score more goals than your opponent to win. Each turn, a player can make three moves. He can:

1) Move one of his players
2) Move multiple players
3) Pass the ball to the teammate
4) Dribble past the opponent
5) Tackle the opponent to get the ball
6) Shoot the ball

The outcome of most actions depend on throwing the dice and on skills of a player. While explaining the possible actions, I will describe the skills that are taken into consideration. For the future, if the skill has colored background and black icon, it gives +1 to a certain dice result. If it has black background and colored icon - +2.

### Movement

By default, each player can move by 2 squares in any direction without the ball and by 1 square with the ball. If the player has a "Rabbit" skill, he gets +1 to all of his movements (3 squares without the ball and 2 with the ball). If a player has a "Tractor" skill, he can be moved after the player has used his previous moves, and after all the moves were made the backgrounds of squares with the players that have the "Tractor" skill will change color to grey. The player cannot move to a certain square if he has a circle that is blocking his way. The available squares for movement have white color

### Move multiple players

If the players of one team are located on the same line (by line I mean those red, yellow, green, and white stripes on the sides of the field), you can move all of them at once in the same direction and use only one move for that. In order to do it, you should press on the stripe at the side of the field, and all the players available for movement will be coloured purple. Then you should choose the direction in which you want to move your players, and when you're done, you should press "Finish Group Movement".

### Passing

By clicking on a player that has the ball, you will see the players that are available for pass. If you press on one of those players, you will initiate a pass. The outcome is based on four things:
    - Distance to your opponent (I am still working to replicate the original formula, but it is a bit challenging. For now, it is just the distance from one square to another divided by 5)
    - Dice roll result (1 to 6)
    - Playmaker skill (Yellow binoculair)
    - Amount of opponent players on squares adjacent to the reciever (-1 for each player)

If the pass is successful (dice roll > distance), the reciever gets the ball. If not, then the closest opponent gets the ball and your turn ends.

### Tackling and Dribbling

Tackling and dribbling work similar to each other. If you are in front of your opponent who has the ball, you can try and tackle him (indicated by red color). Or, if you have the ball and there is an opponent in front of you, yuo can try and dribble past him (indicated by blue color). After that, the outcome is based on the dice roll and two skills: "Wizard" for a player with the ball (Blue Hat) and "Sentinel" for a player without the ball (Two Red Spears). The players change places, and the player who gets better dice result (considering the skills), keeps the ball. The player who got tackled or lost the ball after the dribble cannot make any moves for one turn (he will appear faded out). 

### Shooting

A player can shoot the ball only from the squares with the numbers. When your player with the ball is located at one of those squares, you can initiate a shot by pressing on a green square. The outcome is calculated like this:
    - Dice rolls by both players
    - Position of the shooter (those numbers represent the value that you should add or substract from your dice result. ex.: -3, +4, etc.)
    - Skills (If shooting from the penalty box - Viper (Green Snake), if shooting from outside the box - Cannon (Just a Green Cannon). For goalkeeper - Paw  (self-explanatory))
    - If there is a player of opponent right in front of the shooter, it counts as -1

If a goal is scored, teams are automatically moved to the kickoff position. If it is a save, the goalkeeper gets the ball and he can pass it to any player on his team

## Functionality

In order to make it work, I have made an array with empty squares and then I populate it with the information about the players. Each player has a value for name, his team, if he has the ball, if he should not be able to move for the next turn, if he takes part in the group movement, and a list of his skills. After performing each action, I am changing previous grid with the modified one. 

I will explain this concept on passes: when a player with the ball is clicked, he can pass the ball to any of his teammates. When I am pressing on the teammate (if the pass is successful), I replace an old grid with a new one and make a small change. I put the "hasBall" value of the passer as "false", and "true" for the reciever.

All of the skills that are taken into consideration are added in the methods that are used to calculate the outcome of the action. For example, in passing method, I have several "if" statements that check whether the player has the "Playmaker" skill or whether the reciever is covered by opponent's players. After the dice result is recieved, it goes through those "if" statements, and the value is being either increased or decreased.

After scoring a goal, I am returning all the players to a starting position. In the future, I plan to make it in a better way, but, for now, I just have two grids: one for the case when team 1 has scored, and another one for the case when team 2 has scored.

## Future Additions:

There are still a lot of mechanincs that I have not implemented in this project. So far, my to-do list looks like this:

1) Add padlocks (After each turn, player can put two locks on the field and opponent cannot go through those squares)
2) Restrict the amount of players in their own penalty box by 4
3) Add volleys and headers
4) Add offside rule
5) Add cards that are used in the game

## Updates

### 22/11/2023

1) Added GitHub Pages functionality
2) Added "Rules" button that displays the rules of the game
3) Added the Turn and Move tracker under the score

### 23/11/2023

1) Fixed a bug when after triggering the group movement a player could make more than one movement at a time
2) Removed some of unused methods

# P.S.

Again, I want to address the fact that this is intended only as a project to gain experience, and there was no personal gain in thought. If you'll like how this game works, consider checking it out via https://www.und1c1.com/ .