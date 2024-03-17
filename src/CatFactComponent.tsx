import React, { useState } from 'react';
import {
  Textarea,
  Button,
  Cell,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

interface CatFactResponse {
  fact: string;
}

const CatFactComponent: React.FC = () => {
  const [fact, setFact] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCatFact = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Failed to fetch cat fact');
      }
      const data: CatFactResponse = await response.json();
      const newFact: string = data.fact;
      setFact(newFact);
      const textField: HTMLTextAreaElement | null = document.getElementById('factText') as HTMLTextAreaElement;
      if (textField) {
        const words: string[] = newFact.split(' ');
        textField.focus();
        textField.setSelectionRange(words[0].length + 1, words[0].length + 1);
      }
    } catch (error) {
      console.error('Error fetching cat fact:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Cell>
      <Button onClick={fetchCatFact} loading={loading}>
        {'Get Cat Fact'}
      </Button>
      <br />
      <Textarea id="factText" value={fact} rows={4} cols={50} />
    </Cell>
  );
};

export default CatFactComponent;
