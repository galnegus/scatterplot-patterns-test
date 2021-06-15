# Scatterplot Patterns Test

This is the repository which houses the user survey which was used to evaluate [Scatterplot Patterns](https://github.com/galnegus/scatterplot-patterns). It contains a Next.js/React project that was deployed on vercel, with a FaunaDB backend (currently disabled).

Contained within this repository is also the resulting data (in `r/survey.json` and `r/testCases.json`), as well as the R project that was used to analyze and plot the results (see the `r` folder).

<div align="center">
  <kbd>
    <img src="https://user-images.githubusercontent.com/5460138/122098402-15c61100-ce11-11eb-8b9c-ab3770b75661.png" />
  </kbd>
</div>

### Built with

- Next.js
- React
- Styled JSX
- R

## Runnnig this project

The easiest way to run this project would probably be to configure your own vercel project using this code. It's probably also possible to extract the code and run it with react. The only reason to have Vercel/Next.js is to have a serverless API for storing the survey results in FaunaDB, if that's not needed then it's really just a react project.
