library('tidyverse')

# NOTE: For nice exports in LaTeX, export as 5x7 inch (landscape)

# error heat map
filter(filtered_testCases, answer != -1) %>%
  mutate(distance = abs(answer - nClusters)) %>%
  count(distance, viz, nPoints) %>%
  complete(distance, viz, nPoints, fill = list(n = 0)) %>%
  ggplot(mapping = aes(x = distance, y = viz)) +
  geom_tile(mapping = aes(fill = n)) +
  facet_wrap(vars(nPoints)) +
  scale_fill_distiller(palette = "Greys", direction = 1) +
  theme_minimal()

# error bubble chart
filter(filtered_testCases, answer != -1) %>%
  mutate(distance = abs(answer - nClusters)) %>%
  count(distance, viz, nPoints) %>%
  complete(distance, viz, nPoints, fill = list(n = 0)) %>%
  ggplot(mapping = aes(x = distance, y = viz)) +
  geom_count(mapping = aes(size = n)) +
  facet_wrap(vars(nPoints)) +
  scale_fill_distiller(palette = "Greys", direction = 1)

# avg difference with std dev error bars
pd1 <- position_dodge(width = 1)
filter(filtered_testCases, answer != -1) %>%
  mutate(distance = abs(answer - nClusters)) %>%
  group_by(viz, nPoints, nClusters) %>%
  summarise(avg = mean(distance), stdDev = sd(distance)) %>%
  ggplot() +
  geom_point(mapping = aes(x = nClusters, y = avg, color = viz), size = 2.2, position = pd1) +
  geom_line(mapping = aes(x = nClusters, y = avg, color = viz), size = 0.8, position = pd1) +
  geom_errorbar(mapping = aes(x = nClusters, color = viz, ymin = avg - stdDev, ymax = avg + stdDev), size = 0.3, width = 1, position = pd) + 
  facet_wrap(vars(nPoints), labeller = label_bquote(Points: .(nPoints))) + 
  labs(x = "Number of clusters", y = "Mean answer difference", color = "Method:") +
  scale_x_continuous(breaks = c(3,5,7), minor_breaks = c(3,5,7)) +
  theme(legend.position="bottom")

# avg time with std dev error bars
pd2 <- position_dodge(width = 1)
filtered_testCases %>%
  group_by(viz, nPoints, nClusters) %>%
  summarise(avg = mean(time), stdDev = sd(time)) %>%
  ggplot() +
  geom_point(mapping = aes(x = nClusters, y = avg, color = viz), size = 2.2, position = pd2) +
  geom_line(mapping = aes(x = nClusters, y = avg, color = viz), size = 0.8, position = pd2) +
  geom_errorbar(mapping = aes(x = nClusters, color = viz, ymin = avg - stdDev, ymax = avg + stdDev), size = 0.3, width = 1, position = pd) + 
  facet_wrap(vars(nPoints), labeller = label_bquote(Points: .(nPoints))) + 
  labs(x = "Number of clusters", y = "Mean time (seconds)", color = "Method:") +
  scale_x_continuous(breaks = c(3,5,7), minor_breaks = c(3,5,7)) +
  theme(legend.position="bottom")

# time scatterplot with jitter
filtered_testCases %>%
  group_by(viz, nPoints, nClusters) %>%
  ggplot() +
  geom_point(mapping = aes(x = nClusters, y = time, color = viz), size = 0.2, alpha = 0.6, position = position_jitterdodge(dodge.width = 1.7, jitter.width = 0.3, jitter.height = 0.1)) +
  facet_wrap(vars(nPoints), labeller = label_bquote(Points: .(nPoints))) + 
  labs(x = "Number of clusters", y = "Time (seconds)", color = "Method:") +
  scale_x_continuous(breaks = c(3,5,7), minor_breaks = c(3,5,7)) +
  theme(legend.position="bottom") + 
  guides(colour = guide_legend(override.aes = list(size=5)))

# accuracy bars
filtered_testCases %>%
  group_by(viz, nPoints, nClusters) %>%
  summarise(errors = sum(answer != nClusters), n = n()) %>%
  mutate(accuracy = (1 - errors / n)) %>%
  ggplot() +
  geom_col(mapping = aes(x = factor(nClusters), y = accuracy, fill = viz), width=0.7, position = position_dodge(width=0.7)) +
  facet_wrap(vars(nPoints), labeller = label_bquote(Points: .(nPoints))) +
  labs(x = "Number of clusters", y = "Accuracy", fill = "Method")

# accuracy bars /w point+line
pd3 <- position_dodge(width = 1)
filtered_testCases %>%
  group_by(viz, nPoints, nClusters) %>%
  summarise(errors = sum(answer != nClusters), n = n()) %>%
  mutate(accuracy = (1 - errors / n)) %>%
  ggplot() +
  geom_col(mapping = aes(x = nClusters, y = accuracy, fill = viz), alpha = 0.3, show.legend = FALSE, width = 1, position = position_dodge(width = 1)) +
  geom_point(mapping = aes(x = nClusters, y = accuracy, color = viz), size = 2.2, position = pd3) +
  geom_line(mapping = aes(x = nClusters, y = accuracy, color = viz), size = 0.8, position = pd3) +
  facet_wrap(vars(nPoints), labeller = label_bquote(Points: .(nPoints))) + 
  labs(x = "Number of clusters", y = "Accuracy", color = "Method:") +
  scale_x_continuous(breaks = c(3,5,7), minor_breaks = c(3,5,7)) +
  theme(legend.position="bottom")



# Average time table as barplot
filtered_testCases %>%
  group_by(viz) %>%
  summarise(avg = mean(time), stdDev = sd(time)) %>%
  ggplot() +
  geom_col(mapping = aes(x = viz, y = avg, fill = viz), width=0.7) +
  geom_errorbar(mapping = aes(x = viz, ymin = avg - stdDev, ymax = avg + stdDev), size = 1, width = 0.3, position = position_dodge(width=0.7), color = "gray41") +
  geom_text(aes(label = sprintf("%.2f", avg), y = avg, x = viz), vjust = "top", hjust = "right", nudge_y = 2.1, nudge_x = -0.05) +
  labs(x = "Visualization method", y = "Mean time (seconds)") +
  guides(fill = "none")

# Accuracy table as barplot
filtered_testCases %>%
  group_by(viz) %>%
  summarise(errors = sum(answer != nClusters), n = n()) %>%
  mutate(accuracy = (1 - errors / n)) %>%
  ggplot() +
  geom_col(mapping = aes(x = viz, y = accuracy, fill = viz), width=0.7) +
  geom_text(aes(label = sprintf("%.2f", accuracy), y = accuracy, x = viz), vjust = "top", nudge_y = 0.13) +
  labs(x = "Visualization method", y = "Accuracy") +
  guides(fill = "none")

# Mean answer difference table as barplot
filter(filtered_testCases, answer != -1) %>%
  mutate(distance = abs(answer - nClusters)) %>%
  group_by(viz) %>%
  summarise(avg = mean(distance), stdDev = sd(distance)) %>%
  ggplot() +
  geom_col(mapping = aes(x = viz, y = avg, fill = viz), width=0.7, position = position_dodge(width=0.7)) +
  geom_errorbar(mapping = aes(x = viz, ymin = avg - stdDev, ymax = avg + stdDev), size = 1, width = 0.3, position = position_dodge(width=0.7), color = "gray41") +
  geom_text(aes(label = sprintf("%.2f", avg), y = avg, x = viz), vjust = "top", hjust = "right", nudge_y = 0.5, nudge_x = -0.05) +
  labs(x = "Visualization method", y = "Mean answer difference") +
  guides(fill = "none")


