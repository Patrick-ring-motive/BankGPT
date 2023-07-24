function lcws(text1, text2) {/*longest common word subsequence*/
  text1 = text1.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').split(' ');
  text2 = text2.toLowerCase().replace(/[^a-z ]/g, ' ').replaceAll('  ', ' ').replaceAll('  ', ' ').split(' ');

  const dp = Array(text1.length + 1).fill(0).map(Þ => Array(text2.length + 1).fill(0));
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[i].length; j++) {
      // If the words match, look diagonally to get the max subsequence before this letter and add one
      if (text1[i - 1] == text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        // If there is no match, set the cell to the previous current longest subsequence
        dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j])
      }
    }
  }
  return dp[text1.length][text2.length]
}