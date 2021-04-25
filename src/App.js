//////////////////////////////////
// light & dark > App.js
// Created by Uygur Kiran on 2021/04/25
//////////////////////////////////
import React, { useState, useEffect } from "react";
import "./App.css";
import Values from "values.js";
import { TextField, Button, Chip, Zoom } from "@material-ui/core";

//////////////////////////////////
// HELPERS
//////////////////////////////////
function rgbToHex(r, g, b) {
  function calcHex(x) {
    var hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  return "#" + calcHex(r) + calcHex(g) + calcHex(b);
}

const styles = (theme) => ({
  textField: {
    width: "300px",
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
  },
  btn: {
    color: "white",
    backgroundColor: "#000",

    "&:active": {
      padding: 20,
    },
  },
});

function ColorItem({ rgb, weight, index, hexColor }) {
  const [copiedMsg, setCopiedMsg] = useState(false);
  const bcg = rgb.join(",");
  const hex = rgbToHex(...rgb);
  const hexValue = `#${hexColor}`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopiedMsg(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, [copiedMsg]);

  return (
    <article
      className={`color ${index > 9 && "color-light"}`}
      style={{
        backgroundColor: `rgb(${bcg})`,
        border: copiedMsg
          ? `2px dashed ${index > 9 ? "#fff" : "#000"}`
          : "2px dashed rgba(0,0,0,0)",
      }}
      onClick={() => {
        setCopiedMsg(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>

      <Zoom in={copiedMsg} timeout={120} className="chip-zoom">
        <Chip label="📋 Copied  ✔" color="primary" />
      </Zoom>
    </article>
  );
}

//////////////////////////////////
// APP
//////////////////////////////////
function App() {
  const [color, setColor] = useState("");
  const [colorSet, setColorSet] = useState(new Values("#c23616").all(10));
  const [error, setError] = useState(false);
  const classes = styles();

  function handleSubmit(e) {
    setError(false);
    // TRY TO GET NEW COLORS
    try {
      const colors = new Values(color).all(10);
      setColorSet(colors);
    } catch {
      setError(true);
    }
  }

  return (
    <>
      <header>
        <div className="title">
          <h1>light & dark</h1>
          <h2>Tint & shade generator for hex colors</h2>
        </div>
        <div className="input-wrap">
          <TextField
            style={classes.textField}
            placeholder="#c23616"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            error={error === true}
            label={error && "Incorrect entry."}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <Button
                  style={classes.btn}
                  variant="contained"
                  color="primary"
                  disableElevation
                  onClick={handleSubmit}
                >
                  👌🏻
                </Button>
              ),
            }}
          />
        </div>
      </header>

      <section className="color-list">
        {colorSet.map((color, index) => {
          return (
            <ColorItem
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>

      <footer></footer>
    </>
  );
}

export default App;
