import React, { useState, useCallback } from 'react';
import {
    FormItem,
    Button,
    SimpleCell,
    Group,
    Input,
  } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

interface AgifyResponse {
  name: string;
  age: number;
  count: number;
}

const AgePredictionComponent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [tempName, setTempName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const fetchAge = useCallback(async (nameToFetch: string) => {
    setIsFetching(true);
    try {
      const response = await fetch(`https://api.agify.io/?name=${nameToFetch}`);
      if (!response.ok) {
        throw new Error('Failed to fetch age prediction');
      }
      const data: AgifyResponse = await response.json();
      setAge(data.age);
      setName(nameToFetch);
    } catch (error) {
      console.error('Error fetching age prediction:', error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setTempName(newValue);

    if (timerId) {
      clearTimeout(timerId);
    }

    const id: NodeJS.Timeout = setTimeout(() => {
      if (newValue !== tempName) {
        fetchAge(newValue);
      }
    }, 3000);
    setTimerId(id);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFetching && tempName !== name) {
      fetchAge(tempName);
    }
  };

  return (
    <div style={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%'}}>
      <FormItem onSubmit={handleSubmit}>
          <Input type="text" value={tempName} onChange={handleInputChange} placeholder="Enter your name" />
        <Button type="submit" disabled={isFetching}>Predict Age</Button>
      </FormItem>
      {age !== null && (
        <Group>
          <SimpleCell>{`The predicted age for ${name} is ${age} years old.`}</SimpleCell>
        </Group>
      )}
    </div>
  );
};

export default AgePredictionComponent;