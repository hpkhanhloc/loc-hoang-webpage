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
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import { useStyles, lightTheme } from "../styles";
import useTimer from "../hooks/useTimer";

const Sudoku = (props) => {
  const sudokuTool = SudokuToolCollection();
  const [sudoku, setSudoko] = useState(
    Array(9)
      .fill(null)
      .map(() => Array(9).fill("."))
  );
  const [solver, setSolver] = useState(null);
  const [difficulty, setDifficulty] = useState(53);
  const [open, setOpen] = useState(false);
  const {
    timer,
    isActive,
    isPaused,
    handleStart,
    handlePause,
    handleResume,
    handleReset,
  } = useTimer(0);
  const classes = useStyles()();

  useEffect(() => {
    if (solver !== null) {
      if (handleCompareResult(sudoku, solver)) {
        setOpen(true);
        handlePause();
      }
    }
  }, [sudoku]);

  const handleSelectDifficulty = (event) => {
    setDifficulty(Number(event.target.value));
  };

  const handleCreateNewGame = () => {
    handleReset();
    const rawSudoku = sudokuTool.generator.generate(difficulty);
    const rawSolver = sudokuTool.solver.solve(rawSudoku);
    setSudoko(convertSudoku(rawSudoku));
    setSolver(convertSudoku(rawSolver));
    handleStart();
  };

  const convertSudoku = (stringSudoku) => {
    const arraySudoku = sudokuTool.conversions.stringToGrid(stringSudoku);
    const converted = arraySudoku.map((row) =>
      row.map((e) => (e !== "." ? Number(e) : e))
    );
    return converted;
  };

  const handleHint = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] !== solver[i][j]) {
          const newSudoku = [...sudoku];
          newSudoku[i][j] = solver[i][j];
          setSudoko(newSudoku);
          i = 9;
          break;
        }
      }
    }
  };

  const handleChangeTextBox = (event, rowIndex, colIndex) => {
    const newSudoku = [...sudoku];
    newSudoku[rowIndex][colIndex] = event.target.value;
    setSudoko(newSudoku);
  };

  const handleCompareResult = (sudoku, solver) => {
    const result = sudoku
      .flat()
      .every((element, index) => element == solver.flat()[index]);
    return result;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
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
            <Grid
              item
              sm={12}
              md={8}
              container
              alignContent="center"
              justify="center"
            >
              <Box display="flex" flexDirection="column" border="1px">
                {sudoku.map((row, rowIndex) => (
                  <Box
                    display="flex"
                    flexDirection="row"
                    key={rowIndex}
                    className={
                      [2, 5].includes(rowIndex) ? classes.edge3x3HorBox : ""
                    }
                  >
                    {row.map((col, colIndex) => (
                      <Box
                        key={colIndex}
                        className={
                          [2, 5].includes(colIndex) ? classes.edge3x3VerBox : ""
                        }
                      >
                        {typeof col === "number" ? (
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
                            type="number"
                            size="small"
                            variant="outlined"
                            value={col !== "." ? col : ""}
                            margin="dense"
                            style={{ width: "3rem", margin: 0 }}
                            inputProps={{
                              style: { textAlign: "center" },
                            }}
                            onChange={(event) => {
                              handleChangeTextBox(event, rowIndex, colIndex);
                            }}
                            disabled={solver === null ? true : false}
                          />
                        )}
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid
              item
              sm={12}
              md={4}
              container
              alignItems="center"
              justify="center"
            >
              <Box display="flex" flexDirection="column">
                <Box m={2}>
                  <Typography variant="h4" align="center">
                    {formatTime(timer)}
                  </Typography>
                </Box>
                <FormControl component="fieldset" size="small">
                  <FormLabel component="legend">Difficulty</FormLabel>
                  <RadioGroup
                    aria-label="difficulty"
                    value={difficulty}
                    onChange={handleSelectDifficulty}
                    row
                    defaultValue={53}
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
                    color="primary"
                    disabled={!isActive || isPaused}
                    onClick={handlePause}
                  >
                    Pause
                  </Button>
                  <Button
                    color="primary"
                    disabled={!isActive || !isPaused}
                    onClick={handleResume}
                  >
                    Resume
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
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography variant="h2" align="center">
              You Won!!!
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" align="center">
              {`Solved in ${formatTime(timer)}`}
            </Typography>
          </DialogContent>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Sudoku;
