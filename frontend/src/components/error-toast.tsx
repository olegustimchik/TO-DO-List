import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, Toaster } from 'react-hot-toast';
import { RootState } from '../redux/redux';
import { clearListError } from '../redux/slicers/lists.slicer';
import { clearTaskError } from '../redux/slicers/tasks.slicer';
import { clearAuthError } from '../redux/slicers/auth.slicer';

export const ErrorToaster: FC = () => {
  const dispatch = useDispatch();

  const listError = useSelector((state: RootState) => state.lists.error);
  const taskError = useSelector((state: RootState) => state.task.error);
  const authError = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (listError) {
      toast.error(listError);
      dispatch(clearListError());
    }
  }, [listError]);

  useEffect(() => {
    if (taskError) {
      toast.error(taskError);
      dispatch(clearTaskError());
    }
  }, [taskError]);

  useEffect(() => {
    if (authError) {
      toast.error(authError);
      dispatch(clearAuthError());
    }
  }, [authError]);

  return <Toaster position="top-right" />;
};

