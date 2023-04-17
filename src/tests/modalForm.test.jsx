import * as React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import ModalForm from '../pages/SDKManagement/components/ModalForm';

describe('ModalForm Test', () => {
  it('submits the form with correct data', async () => {
    const finishFn = jest.fn();
    const cancelFn = jest.fn();
    const { getByLabelText, getByText } = render(
      <ModalForm finishFn={finishFn} cancelFn={cancelFn} />
    );

    await act(() => {
      const clientNameInput = getByLabelText(/Client name/i);
      const boardNameInput = getByLabelText(/Board name/i);
      const requestorInput = getByLabelText(/Requestor/i);
      const submitButton = getByText(/Submit/i);
      fireEvent.change(clientNameInput, { target: { value: 'ABC' } });
      fireEvent.change(boardNameInput, { target: { value: 'XYZ' } });
      fireEvent.change(requestorInput, { target: { value: 'John' } });
      fireEvent.click(submitButton);
    })

    expect(finishFn).toHaveBeenCalledWith({
      clientName: 'ABC',
      boardName: 'XYZ',
      requestor: 'John',
    });
  });

  it('cancels the form without submitting data', async () => {
    const finishFn = jest.fn();
    const cancelFn = jest.fn();
    const { getByText } = render(
      <ModalForm finishFn={finishFn} cancelFn={cancelFn} />
    );
    await act(() => {
      const cancelButton = getByText(/Cancel/i);
      fireEvent.click(cancelButton);
    })

    expect(finishFn).not.toHaveBeenCalled();
    expect(cancelFn).toHaveBeenCalled();
  });
})
