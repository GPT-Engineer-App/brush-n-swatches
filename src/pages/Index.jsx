import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#6d4c41", "#8d6e63", "#a1887f", "#d7ccc8", "#bcaaa4", "#4e342e", "#3e2723"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColorStyle, setSelectedColorStyle] = useState({});
  const [selectedBrushStyle, setSelectedBrushStyle] = useState({});

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.globalAlpha = 0.6; // Set global alpha for softer strokes
  }, []);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.arc(offsetX, offsetY, brushSize / 2, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.beginPath();
    context.arc(offsetX, offsetY, brushSize / 2, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleSetColor = (col) => {
    setColor(col);
    setSelectedColorStyle({ border: `2px solid ${col}`, transform: 'scale(1.2)' });
  };

  const handleSetBrushSize = (size) => {
    setBrushSize(size);
    setSelectedBrushStyle({ border: '2px solid black', transform: 'scale(1.2)' });
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block", background: "#FFFFFF" }}
      />
      <Flex position="absolute" bottom={4} width="100%" justifyContent="center" alignItems="center">
        <VStack spacing={4} align="center">
          <Flex>
            {colors.map((col) => (
              <IconButton
                key={col}
                aria-label={col}
                icon={<FaCircle color={col} />}
                size="lg"
                onClick={() => handleSetColor(col)}
                m={1}
                isRound
                style={color === col ? selectedColorStyle : {}}
              />
            ))}
          </Flex>
          <Flex>
            {brushSizes.map((size) => (
              <IconButton
                key={size}
                aria-label={`Brush size ${size}`}
                icon={<Box as="span" width={`${size}px`} height={`${size}px`} borderRadius="50%" backgroundColor="black" />}
                size="lg"
                onClick={() => handleSetBrushSize(size)}
                m={1}
                isRound
                style={brushSize === size ? selectedBrushStyle : {}}
              />
            ))}
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;