import React from 'react';
import { useSelector } from 'react-redux';
import CbLoader from './webCobaltLoader';

export default function LoaderContainer() {
  const isLoading = useSelector((state) => state?.uiLoader?.loading);
  return <CbLoader visible={isLoading} />;
}
