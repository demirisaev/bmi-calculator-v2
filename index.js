function formatOutput(userObject) {
    return `
    **************
    BMI CALCULATOR
    **************

    age: ${userObject.age} years
    gender: ${userObject.gender}
    height: ${userObject.weightInKg} m
    weight: ${userObject.heightInM} kg
    do you exercise daily? ${userObject.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userObject.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userObject.idealWeight} kg
    With a normal lifestyle you burn ${userObject.dailyCalorie} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userObject.idealWeight} kg:

    Eat ${userObject.dietCaloriecalories} a day
    For ${userObject.dietWeeks} weeks
    `;
  }

function validateNumberOfInputs(argv) {
    
    if (argv.length !== 7) {
      console.log(`
        You gave ${argv.length - 2} argument(s) to the program
    
        Please provide 5 arguments for
        
        weight (kg), 
        height (m), 
        age (years), 
        wether you exercise daily (yes or no)
        and your gender (m or f)
        
        Example:
    
        $ node index.js 82 1.79 32 yes m
      `);
  
      process.exit();
    }
  }

  function validateWeightHeightAndAge(weight, height, ageOfUser, argv) {
    if (isNaN(weight) || isNaN(height) || isNaN(ageOfUser)) {
      console.log(`
        Please make sure weight, height and age are numbers:
  
        weight (kg) example: 82 | your input: ${argv[2]}
        height (m) example 1.79 | your input: ${argv[3]}
        age (years) example 32  | your input: ${argv[4]} 
  
        $ node index.js 82 1.79 32 yes m
      `);
  
      process.exit();
    }
  
    if (ageOfUser < 20) {
      console.log(`
        This BMI calculator was designed to be used by people older than 20
    
        BMI is calculated differently for young people.
    
        Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)
    
        For more information
      `);
  
      process.exit();
    }
  
    if (weight < 30 || weight > 300) {
      console.log(`
        Please enter a weight in kgs
        
        Your weight of ${weight} kgs does not fall in the range between 30 kg and 300 kg
    
        If you weight is below 30 kg or over 300 kg seek professional medical help
      `);
  
      process.exit();
    }
  }

function validateDailyExercise(dailyExer){
    if (dailyExer !== "yes" && dailyExer !== "no"){
        console.log(`
        
        Please enter true keywords
        
        Your answer is '${dailyExer}' not correct answer.
    `);
    process.exit();
    }
}

function validateGender(gender){
    if (gender !== "m" && gender !== "f"){
        console.log(`
        
        Please enter true keywords
        
        Your answer is '${gender}' not correct answer.
    `);
    process.exit();
    }
}

function calculateBMI(weight, height) {
  return weight / (height * height);
}

function calculateBMR(weight, height, ageOfUser, genderOfUser) {
  const heightInCm = height * 100;

  return genderOfUser === "m"
    ? 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50
    : 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;

  /*if (genderOfUser === "m") {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50;
    } else {
        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150;
    }

    return BMR;*/
}

function dailyCalories(infoExercise, newBMR) {
  return infoExercise === "yes" ? newBMR * 1.6 : newBMR * 1.4;

  /*if (infoExercise === "yes"){
       return  newBMR * 1.6 ;
    }
    else {
       return newBMR * 1.4;
    }*/
  //console.log("exercise info: ", infoExercise, newBMR)
  /*return infoExercise === "yes"
    ? newBMR * 1.6
    : newBMR * 1.4;*/
}

function calculateIdealWeight(height) {
  return 22.5 * height * height;
}

function calculateDietWeeks(weightToLose) {
  return weightToLose / 0.5;
}

function calculateweighToLose(weight, idealweight) {
  return Math.abs(weight - idealweight);
}

function calculateDietCalories(weighttoloses, dailycalori) {
  return weighttoloses > 0 ? dailycalori - 500 : dailycalori + 500;
}

function bmiCalculator() {

   // validateNumberOfInputs(["/path/to/node", "/Users/hrntrknl/Desktop/Codaisseur/bmi-calculator-v2/index.js", 82, 1.79, 32, "m"]);
   validateNumberOfInputs(process.argv);

  const weightInKg = parseInt(process.argv[2]);
  const heightInM = parseFloat(process.argv[3]);
  const age = parseInt(process.argv[4]);
  const dailyExercise = process.argv[5];
  const gender = process.argv[6];

  validateWeightHeightAndAge(weightInKg, heightInM, age, process.argv);
  validateDailyExercise(dailyExercise);
  validateGender(gender);

  const BMR = calculateBMR(weightInKg, heightInM, age, gender);
  const BMI = calculateBMI(weightInKg, heightInM);
  const idealWeight = calculateIdealWeight(heightInM);
  const dailyCalorie = dailyCalories(dailyExercise, BMR);
  const weightToLose = calculateweighToLose(weightInKg, idealWeight);
  const dietWeeks = calculateDietWeeks(weightToLose);
  const dietCalorie = calculateDietCalories(weightToLose, dailyCalorie);

  const user = {
    weightInKg: weightInKg,
    heightInM: heightInM,
    age: age,
    dailyExercise: dailyExercise,
    gender: gender,
    BMI: BMI,
    idealWeight: idealWeight,
    dailyCalorie: dailyCalorie,
    weightToLose: weightToLose,
    dietWeeks: dietWeeks,
    dietCalorie: dietCalorie,
  };

  const output = formatOutput(user);
  console.log(output);

  /*console.log("WEIGHT: ", weightInKg, "kg");
  console.log("HEIGHT: ", heightInM, "m");
  console.log("AGE: ", age, "years");
  console.log("DAILY EXERCISE: ", dailyExercise);
  console.log("GENDER: ", gender);
  console.log("idealWeight: ", idealWeight, "kg");
  console.log("Daily Calories: ", dailyCalorie, "cal");
  console.log("Weight to Lose: ", weightToLose, "kg");
  console.log("Diet Weeks: ", dietWeeks, "weeks");
  console.log("Diet Calories eat per day", dietCalorie, "cal");
  console.log("main BMI: ", BMI);*/
}

bmiCalculator();
