import React, { useEffect, useState } from "react";
import SudokuToolCollection from "sudokutoolcollection";
import {
  Container,
  Paper,
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CardContent,
  Card,
} from "@material-ui/core";
import { useStyles, lightTheme } from "../styles";

const Sudoku = (props) => {
  const sudokuTool = SudokuToolCollection();
  const [sudoku, setSudoko] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill("."))
  );
  const [solver, setSolver] = useState(null);
  const [difficulty, setDifficulty] = useState(35);
  const classes = useStyles()();

  useEffect(() => {
    console.log("change");
  }, [sudoku]);

  const handleSelectDifficulty = (event) => {
    setDifficulty(Number(event.target.value));
  };

  const handleCreateNewGame = () => {
    const rawSudoku = sudokuTool.generator.generate(difficulty);
    const rawSolver = sudokuTool.solver.solve(rawSudoku);
    setSudoko(sudokuTool.conversions.stringToGrid(rawSudoku));
    setSolver(sudokuTool.conversions.stringToGrid(rawSolver));
  };

  const handleHint = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] !== solver[i][j]) {
          sudoku[i][j] = solver[i][j];
          setSudoko(sudoku);
          i = 9;
          break;
        }
        break;
      }
    }
    console.log(sudoku);
  };

  return (
    <Container>
      <Paper>
        <Box p={2}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="h5">Sudoku</Typography>
            </Box>
          </Box>
          <Divider style={{ marginTop: 16, marginBottom: 32 }} />
          <Grid container direction="row">
            <Grid item xs={8} container alignContent="center" justify="center">
              <Box display="flex" flexDirection="column" border="1px">
                {sudoku.map((row, rowIndex) => (
                  <Box
                    display="flex"
                    flexDirection="row"
                    key={rowIndex}
                    className={
                      [2, 5].includes(rowIndex) && classes.edge3x3HorBox
                    }
                  >
                    {row.map((col, colIndex) => (
                      <Box
                        key={colIndex}
                        className={
                          [2, 5].includes(colIndex) && classes.edge3x3VerBox
                        }
                      >
                        {col !== "." ? (
                          <TextField
                            size="small"
                            variant="outlined"
                            value={col}
                            margin="dense"
                            style={{ width: "3rem", margin: 0 }}
                            disabled={true}
                            inputProps={{
                              style: {
                                textAlign: "center",
                                color: "white",
                                background: lightTheme.palette.primary.light,
                                fontWeight: "bolder",
                              },
                            }}
                          />
                        ) : (
                          <TextField
                            size="small"
                            variant="outlined"
                            value={col}
                            margin="dense"
                            style={{ width: "3rem", margin: 0 }}
                            inputProps={{ style: { textAlign: "center" } }}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={4} container alignItems="center">
              <Box display="flex" flexDirection="column">
                <FormControl component="fieldset" size="small">
                  <FormLabel component="legend">Difficulty</FormLabel>
                  <RadioGroup
                    aria-label="difficulty"
                    value={difficulty}
                    onChange={handleSelectDifficulty}
                    row
                    defaultValue={35}
                  >
                    <FormControlLabel
                      value={53}
                      control={<Radio />}
                      label="Easy"
                    />
                    <FormControlLabel
                      value={35}
                      control={<Radio />}
                      label="Medium"
                    />
                    <FormControlLabel
                      value={26}
                      control={<Radio />}
                      label="Hard"
                    />
                    <FormControlLabel
                      value={17}
                      control={<Radio />}
                      label="Very-hard"
                    />
                  </RadioGroup>
                </FormControl>
                <Box display="flex" flexDirection="row" justifyContent="center">
                  <Button color="primary" onClick={handleCreateNewGame}>
                    New game
                  </Button>
                  <Button
                    color="secondary"
                    disabled={solver === null ? true : false}
                    onClick={handleHint}
                  >
                    Hint
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: 32, marginBottom: 8 }} />
        </Box>
      </Paper>
    </Container>
  );
};

export default Sudoku;
