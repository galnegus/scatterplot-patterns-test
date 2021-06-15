library(DescTools)

data_w_distance <- filter(filtered_testCases, answer != -1) %>%
  mutate(distance = abs(answer - nClusters))

print("Accuracy per viz")
filtered_testCases %>%
  group_by(viz) %>%
  summarise(errors = sum(answer != nClusters), n = n()) %>%
  mutate(accuracy = (1 - errors / n))



print("MEAN and SD (distance)")
data_w_distance %>%
  group_by(viz) %>%
  summarise(avg = mean(distance), stdDev = sd(distance))

print("Mean and SD (accuracy)")
filtered_testCases %>%
  group_by(viz) %>%
  summarise(errors = sum(answer != nClusters), n = n()) %>%
  mutate(accuracy = (1 - errors / n))
  

# do accuracy per survey and viz type
data_w_correctanswer <- filtered_testCases %>%
  group_by(survey, viz) %>%
  summarise(errors = sum(answer != nClusters), n = n()) %>%
  mutate(accuracy = (1 - errors / n))
t.test(filter(data_w_correctanswer, viz == "color")$accuracy,
       filter(data_w_correctanswer, viz == "patterns")$accuracy,
       paired = TRUE)
t.test(filter(data_w_correctanswer, viz == "color")$accuracy,
       filter(data_w_correctanswer, viz == "winglets")$accuracy,
       paired = TRUE)
t.test(filter(data_w_correctanswer, viz == "patterns")$accuracy,
       filter(data_w_correctanswer, viz == "winglets")$accuracy,
       paired = TRUE)



# THIS IS NOT A GOOD IDEA, BECAUSE DISTANCE IS NOT CONTINUOUS
print("3-WAY INTERACTION")
m1 <- aov(distance ~ as.factor(nClusters) * as.factor(nPoints) * viz, data = data_w_distance)
summary(m1)
EtaSq(m1, type = 1)
