library('tidyverse')

# TIME EXCEEDS 60 SECONDS
filter_timeExceeded <- filter(testCases, time > 60) %>%
  pluck('survey') %>%
  unique

# TOTAL TIME DOESN'T EXCEED 120 SECONDS
filter_tooFast <- filter(surveys, totalTime < 120) %>%
  pluck('id')

# LESS THAN 3 UNIQUE ANSWERS
getUniqueAnswers <- function(surveyId) {
  filter(testCases, survey == surveyId) %>%
    pluck('answer') %>%
    unique %>%
    length
}
uniqueAnswers <- surveys %>% 
  pluck('id') %>% 
  map(getUniqueAnswers)
filter_uniqueAnswers <- filter(surveys, uniqueAnswers[id] < 3) %>%
  pluck('id')

# MORE THAN OR EQUAL TO 10 SAME ANSWERS IN A ROW
longestSequenceHelper <- function(vec, max, curr, i, lastAnswer) {
  if (i > length(vec)) {
    max
  } else {
    if (vec[i] == lastAnswer) {
      newMax <- if (curr + 1 > max) curr + 1 else max
      longestSequenceHelper(vec, newMax, curr + 1, i + 1, vec[i])
    } else {
      longestSequenceHelper(vec, max, 1, i + 1, vec[i])
    }
  }
}
longestSequence <- function(vec) {
  longestSequenceHelper(vec, 1, 0, 1, -2)
}
getSameAnswers <- function(surveyId) {
  filter(testCases, survey == surveyId) %>%
    arrange(order) %>%
    pluck('answer') %>%
    longestSequence()
}
sameAnswers <- surveys %>% 
  pluck('id') %>% 
  map(getSameAnswers)
filter_sameAnswers <- filter(surveys, sameAnswers[id] >= 10) %>%
  pluck('id')

# FAIL DUMMY TEST
filter_dummyTest <- filter(surveys, dummyAnswer != 3) %>%
  pluck('id')

all_filters <- union(filter_dummyTest, filter_sameAnswers) %>%
  union(filter_timeExceeded) %>%
  union(filter_tooFast) %>%
  union(filter_uniqueAnswers)

# final filtering
filtered_testCases <- testCases %>%
  filter(!(survey %in% all_filters))
filtered_surveys <- surveys %>%
  filter(!(id %in% all_filters))
