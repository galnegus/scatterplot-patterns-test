library('jsonlite')
surveys <- read_json(path = 'surveys.json', simplifyVector = TRUE)
testCases <- read_json(path = 'testCases.json', simplifyVector = TRUE)
