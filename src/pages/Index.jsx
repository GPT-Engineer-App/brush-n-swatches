import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

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
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    const context = canvasRef.current.getContext("2d");
    const gradient = context.createRadialGradient(offsetX, offsetY, brushSize / 4, offsetX, offsetY, brushSize);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    context.fillStyle = gradient;
    context.lineTo(offsetX, offsetY);
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.stroke();
    context.fill();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
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
                onClick={() => setColor(col)}
                m={1}
                isRound
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
                onClick={() => setBrushSize(size)}
                m={1}
                isRound
              />
            ))}
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;