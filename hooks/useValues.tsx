import { useHeaderHeight } from '@react-navigation/stack';

const useValues = () => {
  const headerHeight = useHeaderHeight();

  return {
    maxLength_postTitle: 500,
    tabHeaderHeight: headerHeight,
  };
};

export default useValues;
