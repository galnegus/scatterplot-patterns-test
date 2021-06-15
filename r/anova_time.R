library(DescTools)

print("MEAN and SD")
filtered_testCases %>%
  group_by(viz) %>%
  summarise(avg = mean(time), stdDev = sd(time))

print("3-WAY INTERACTION")
m1 <- aov(time ~ as.factor(nClusters) * as.factor(nPoints) * viz, data = filtered_testCases)
summary(m1)
EtaSq(m1, type = 1)

print("COLOR")
aov_color <- filtered_testCases %>%
  filter(viz == "color") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints), data = .)
summary(aov_color)
EtaSq(aov_color, type = 1)

print("GREYSCALE")
aov_color <- filtered_testCases %>%
  filter(viz == "greyscale") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints), data = .)
summary(aov_color)
EtaSq(aov_color, type = 1)

print("PATTERNS")
aov_color <- filtered_testCases %>%
  filter(viz == "patterns") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints), data = .)
summary(aov_color)
EtaSq(aov_color, type = 1)

print("SEQUENTIAL")
aov_color <- filtered_testCases %>%
  filter(viz == "sequential") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints), data = .)
summary(aov_color)
EtaSq(aov_color, type = 1)

print("WINGLETS")
aov_color <- filtered_testCases %>%
  filter(viz == "winglets") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints), data = .)
summary(aov_color)
EtaSq(aov_color, type = 1)

print("COLOR x PATTERNS")
aov_color_x_patterns <- filtered_testCases %>%
  filter(viz == "color" | viz  == "patterns") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints) * viz, data = .)
summary(aov_color_x_patterns)
EtaSq(aov_color_x_patterns, type = 1)

print("COLOR x WINGLETS")
aov_color_x_winglets <- filtered_testCases %>%
  filter(viz == "color" | viz  == "winglets") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints) * viz, data = .)
summary(aov_color_x_winglets)
EtaSq(aov_color_x_winglets, type = 1)

print("PATTERNS x WINGLETS")
aov_patterns_x_winglets <- filtered_testCases %>%
  filter(viz == "patterns" | viz  == "winglets") %>%
  aov(time ~ as.factor(nClusters) * as.factor(nPoints) * viz, data = .)
summary(aov_patterns_x_winglets)
EtaSq(aov_patterns_x_winglets, type = 1)
