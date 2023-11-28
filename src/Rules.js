import React from 'react';
import './App.css'
import Modal from 'react-modal';
import Viper from './Skills/viper.png'
import Rabbit from './Skills/rabbit.png'
import Paw from './Skills/paw.png'
import BlackPaw from './Skills/black-paw.png'
import Tractor from './Skills/tractor.png'
import Playmaker from './Skills/playmaker.png'
import BlackPlaymaker from './Skills/black-playmaker.png'
import Wizard from './Skills/wizard.png'
import BlackWizard from './Skills/black-wizard.png'
import Gladiator from './Skills/gladiator.png'
import BlackGladiator from './Skills/black-gladiator.png'
import BlackViper from './Skills/black-viper.png'
import Cannon from './Skills/cannon.png'
import BlackCannon from './Skills/black-cannon.png'

const Rules = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={'rules'}
    >
      <button onClick={onClose}>X</button>
      <>
          <h2>Rules:</h2>
          <p>The main objective of the game is to score more goals than your opponent.</p>
          <p>Each Team has three actions per turn. A player can:</p>
          <ol>
            <li>Move one player</li>
            <li>Move multiple players</li>
            <li>Pass the ball</li>
            <li>Dribble past the opponent</li>
            <li>Tackle opponent</li>
            <li>Shoot the ball</li>
          </ol>
          <h3>Skills:</h3>
          <p>All actions are affected by dice roll results and player skills. In the future, when I am refering to skills, they can be of two 
            types: colored and black. Colored skill gives +1 to the dice roll result, and Black skill gives +2. For example, the colored "Paw"
            <img src={Paw} className='skills' alt=''></img> gives +1 to saves, and "Black Paw" <img src={BlackPaw} className='skills' alt=''></img> gives +2
          </p>
          <h3>Movement: </h3>
          <p>Click on any player. White squares are the ones to which your player is allowed to move. Players with the ball can move by 1 square
            any direction, and players without the ball - by 2 squares. If a player has a "Rabbit" skill <img src={Rabbit} className='skills' alt=''></img>, he gets +1 to movement (thus, 
            2 squares with the ball and 3 squares without the ball). If a player has a "Tractor" skill <img src={Tractor} className='skills' alt=''></img>, he can make a movement after
            the team runs out of moves (indicated by grey color)
          </p>
          <h3>Group Movement: </h3>
          <p>If the players of one team are located on the same line (by line I mean those red, yellow, green, and white stripes on the sides of the 
            field), you can move all of them at once in the same direction and use only one move for that. In order to do it, you should press on the 
            stripe at the side of the field, and all the players available for movement will be coloured purple. You can move those players only in the
            same direction, but for different amount of squares. You may even not move some of them. Then you should choose the direction 
            in which you want to move your players (Arrow buttons in Stats section), and when you're done, you should press "Finish Group Movement".</p>
            <h3>Passes: </h3>
            <p>By clicking on a player that has the ball, you will see the players that are available for pass. If you press on one of those players, you will 
              initiate a pass. The outcome is based on four things:
            <ol>
              <li>Distance to your opponent (I am still working to replicate the original formula, but it is a bit challenging. For now, 
                it is just the distance from one square to another divided by 5)</li>
                <li>Dice roll result (1 to 6)</li>
                <li>Playmaker skill <img src={Playmaker} className='skills' alt=''></img>/<img src={BlackPlaymaker} className='skills' alt=''></img></li>
                <li>Amount of opponent players on squares adjacent to the reciever (-1 for each player)</li>
            </ol>
        If the pass is successful (dice roll higher than distance), the reciever gets the ball. If not, then the closest opponent gets the ball and your turn ends.</p>
        <h3>Tackles and Dribble: </h3>
        <p>Tackling and dribbling work similar to each other. If you are in front or to the side of your opponent who has the ball, you can try
          and tackle him (indicated by red color). Or, if you have the ball and there is an opponent in front of you, yuo can try and dribble
          past him (indicated by blue color). After that, the outcome is based on the dice roll and two skills: "Wizard" 
          <img src={Wizard} className='skills'alt=''></img>/<img src={BlackWizard} className='skills' alt=''></img> for a player with the 
          ball and "Gladiator" <img src={Gladiator} className='skills' alt=''></img>/<img src={BlackGladiator} className='skills' alt=''></img> 
          for a player without the ball. The players change places, and the player who gets better 
          dice result (considering the skills), keeps the ball. The player who got tackled or lost the ball after the dribble cannot make any 
          moves for one turn (he will appear faded out). </p>
        <h3>Shooting:</h3>
        <p>A player can shoot the ball only from the squares with the numbers. When your player with the ball is located at one of those squares, 
          you can initiate a shot by pressing on a green square. The outcome is calculated like this:
          <ol>
            <li>Dice rolls by both players</li>
            <li>Position of the shooter (those numbers represent the value that you should add or substract from your dice result. ex.: -3, +4, etc.)</li>
            <li>Skills (If shooting from the penalty box - Viper <img src={Viper} className='skills' alt=''></img>/<img src={BlackViper} className='skills' alt=''></img>, 
            if shooting from outside the box - Cannon <img src={Cannon} className='skills' alt=''></img>/<img src={BlackCannon} className='skills' alt=''></img>. 
              For goalkeeper - Paw  <img src={Paw} className='skills' alt=''></img>/<img src={BlackPaw} className='skills' alt=''></img>)</li>
            <li>If there is a player of opponent right in front of the shooter, it counts as -1</li>
          </ol>
          If a goal is scored, teams are automatically moved to the kickoff position. If it is a save, the goalkeeper gets the ball and he can
           pass it to any player on his team</p>
        </>
    </Modal>
  );
};

export default Rules;