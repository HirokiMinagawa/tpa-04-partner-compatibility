const { candidates } = require('./data/candidates-data.js');

const calculatePoint = (submittedAnswerBlock, candidateAnswerBlock) => {
  let score = 0;
  for (let i = 0, len = submittedAnswerBlock.length; i < len; i += 1) {
    const submittedAnswer = submittedAnswerBlock[i].value;
    const candidateAnswer = candidateAnswerBlock[i].value;
    if (submittedAnswer === candidateAnswer) {
      score += 2;
    } else if (Math.abs((Number(submittedAnswer) - Number(candidateAnswer))) === 1) {
      score += 1;
    }
  }
  return score;
};

const calculateBestMatch = function(quizSubmissions) {
  // TODO: replace this...
  // return candidates[0];

  // TODO: implement the following algorithm for
  // calculating the candidate who is the best match for you

  // set closest match to 1st candidate

  // for each candidate
  //  for each question
  //    if question values are exactly the same
  //      add 2 points
  //    if question values are one score away
  //      add 1 point
  //  update the closest match

  // for ties, the last person who has the highest score is returned

  // return closest match

  const scoreStored = [];
  const startQuestionBlock = 2;
  const finishQuestionBlock = 6;

  for (let i = 0; i < candidates.length; i += 1) {
    let score = 0;
    for (let t = startQuestionBlock; t <= finishQuestionBlock; t += 1) {
      const submittedAnswerBlock = quizSubmissions[t];
      const candidateAnswerBlock = candidates[i][t];
      score += calculatePoint(submittedAnswerBlock, candidateAnswerBlock);
    }

    scoreStored.push(score);
  }

  return candidates[scoreStored.lastIndexOf(Math.max.apply(null, scoreStored))];
};

module.exports = {
  calculateBestMatch,
};
