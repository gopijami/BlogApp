const { useDispatch, useSelector } = require("react-redux");
const store = require("./store"); // Import your store

const useAppDispatch = () => useDispatch();
const useAppSelector = useSelector;

module.exports = {
  useAppDispatch,
  useAppSelector,
};