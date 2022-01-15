<template>
  <Experiment title="Mental Rotation Experiment">

    <InstructionScreen :title="'Welcome'">
      Welcome and thank you for participating in this experiment. 
      You will contribute to a study that will provide important insights into human cognitive 
      processing.
      <br />
      <br />
      The experiment will take about 20 Minutes and should be done on a desktop computer, mobile 
      devices are not supported. 
      Make sure that you are in a calm environment and put away everything that might distract 
      you during the next 20 minutes.
      <br />
      <br />
      Hit next when you are ready for more detailed instructions!
    </InstructionScreen>

    <InstructionScreen :title="'Instructions'">
      Your task in this experiment is to look at two 3-dimensional objects and decide whether 
      they are the same or different. The objects will be displayed in different angles and it 
      is important that you decide as fast as possible. To indicate sameness or difference you 
      will have the two keys f and j on your keyboard. When the experiment starts you will see 
      which key will be used for same and for different. That information is displayed 
      throughout the whole experiment.
      <br />
      <br />
      There is a short practice phase to get you familiar with the setting, followed by the main 
      test phase. In between you can pause the experiment.
      <br />
      <h4>Try to be as fast as you can!</h4>
      <h4>Try to get as many decisions correct as possible!</h4>
    </InstructionScreen>


    <!-- Here we create screens in a loop for every entry in training_trials -->
    <!-- same_key_letter: 'same',
         diff_key_letter: 'different'i
         -->
    <template v-for="(training_trial_task, i) of training_trials">
      <KeypressScreen
        :keys=setRandomKeys()
        :fixationTime=getRandomFixTime()
        :feedbackTime="800"
        :responseTime="7500"
      >
        <template #stimulus>
          <img :src="training_trial_task.picture" />
          <Record :data="{
              'angle': training_trial_task.angle,
              'expected_answ': training_trial_task.expected,
              'item_number': training_trial_task.item,
              'trial_type': 'training',
              'trial_number': i,
            }" />
        </template>
        <template #feedback>
          <p v-if="!$magpie.measurements.hasOwnProperty('response')">Faster!</p>
          <p v-else-if="$magpie.measurements.response == training_trial_task.expected">Correct  :)</p>
          <p v-else>Incorrect</p>
        </template>
      </KeypressScreen>
    </template>

    <InstructionScreen :title="'Practice finished'">
      Well done, you finished the practice phase.
      <br />
      <br />
      Hit Next whenever you are ready to continue with the main experiment. And remember:
      <br />
      <h4>Try to be as fast as you can!</h4>
      <h4>Try to get as many decisions correct as possible!</h4>
    </InstructionScreen>

    <!-- Here we create screens in a loop for every entry in main_trials -->

    <template v-for="(main_trial_task, i) of main_trials">
      <KeypressScreen
        :keys=setRandomKeys()
        :fixationTime=getRandomFixTime()
        :feedbackTime="800"
        :responseTime="7500"
      >
        <template #stimulus>
          <img :src="main_trial_task.picture" />
	        <Record :data="{
              'angle': main_trial_task.angle,
              'expected_answ': main_trial_task.expected,
              'item_number': main_trial_task.item,
              'trial_type': 'main',
              'trial_number': i,
            }" />
        </template>
        <template #feedback>
          <p v-if="!$magpie.measurements.hasOwnProperty('response')">Faster!</p>
          <p v-else-if="$magpie.measurements.response == main_trial_task.expected">Correct  :)</p>
          <p v-else>Incorrect</p>
        </template>
      </KeypressScreen>
    </template>

    <PostTestScreen :languages="false">
      <input type="radio" id="left" value="Left" v-model="$magpie.measurements.handedness">
      <label for="left">Left handed</label>
      <br />
      <input type="radio" id="right" value="Right" v-model="$magpie.measurements.handedness">
      <label for="right">Right handed</label>
      <br />
      <br />
    </PostTestScreen>

    <!-- While developing your experiment, using the DebugResults screen is fine,
      once you're going live, you can use the <SubmitResults> screen to automatically send your experimental data to the server. -->
    <!-- <DebugResultsScreen /> -->
    <SubmitResultsScreen />

  </Experiment>
</template>

<script>
// Load data from csv files as javascript arrays with objects
// Import the information from these files into variables `main_trials` and `training_trials`
import main_trials from '../trials/mr_main_trials.csv';
import training_trials from '../trials/mr_training_trials.csv';
import _ from 'lodash';

//assign keys same and different randomly for each participant
var same_key = _.sample(['j', 'f']);
var object_1 = {'j': 'same', 'f': 'different'};
var object_2 = {'j': 'different', 'f': 'same'};
var randomized_keys = (same_key === 'j') ? object_1 : object_2;

export default {
  name: 'App',
  data() {
    same_key;
    randomized_keys;
    console.log('same_key: ', same_key);
    console.log('Randomized Key Object: ', randomized_keys);

    return {
      training_trials: _.shuffle(training_trials),
      main_trials: _.shuffle(main_trials),
      // Expose lodash.range to template above
      range: _.range
    };
  },
  methods: {
    getRandomFixTime() {
      return _.sample([300, 450, 600, 750, 900, 1050, 1200]) 
    },
    setRandomKeys() {
      return randomized_keys
    },
  },
  mounted() {
    this.$magpie.addExpData({
      same_key : same_key
    });
  }
};


</script>
