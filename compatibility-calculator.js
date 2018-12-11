const { candidates } = require('./data/candidates-data.js');

const caluclatePoint = (submittedAnswerBlock, candidateAnswerBlock, candidateScoreInfo) => {
  for (let i = 0, len = submittedAnswerBlock.length; i < len; i += 1) {
    const submittedAnswer = submittedAnswerBlock[i].value;
    const candidateAnswer = candidateAnswerBlock[i].value;
    if (submittedAnswer === candidateAnswer) {
      candidateScoreInfo.score += 2;
    } else if (Math.abs((Number(submittedAnswer) - Number(candidateAnswer))) === 1) {
      candidateScoreInfo.score += 1;
    }
  }
  return candidateScoreInfo;
};

const candidateMatched = (name) => {
  let matchedPerson = [];
  for (let i = 0, len = candidates.length; i < len; i += 1) {
    const candidateName = candidates[i][0][0].value;
    if (candidateName === name) {
      matchedPerson = candidates[i];
    }
  }
  return matchedPerson;
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
    let candidateScoreInfo = {};
    const candidateName = candidates[i][0][0].value;
    candidateScoreInfo.name = candidateName;
    candidateScoreInfo.score = 0;
    candidateScoreInfo.candidateNumber = i;
    for (let t = startQuestionBlock; t <= finishQuestionBlock; t += 1) {
      const submittedAnswerBlock = quizSubmissions[t];
      const candidateAnswerBlock = candidates[i][t];
      candidateScoreInfo = caluclatePoint(submittedAnswerBlock, candidateAnswerBlock, candidateScoreInfo);
    }

    scoreStored.push(candidateScoreInfo);
  }

  scoreStored.sort((a, b) => {
    if (a.score < b.score) return 1;
    if (a.score > b.score) return -1;
    if (a.candidateNumber < b.candidateNumber) return 1;
    if (a.candidateNumber > b.candidateNumber) return -1;
    return 0;
  });

  return candidateMatched(scoreStored[0].name);
};

module.exports = {
  calculateBestMatch,
};
