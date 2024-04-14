import React from 'react';

const WeeklyJournal = () => {
  const journalEntries = [
    {
      image: 'https://example.com/image1.jpg',
      content: 'This is the content of journal entry 1.',
    },
    {
      image: 'https://example.com/image2.jpg',
      content: 'This is the content of journal entry 2.',
    },
    // Add more journal entries as needed
  ];

  return (
    <div>
      <h2>Weekly Journal</h2>
      {journalEntries.length > 0 ? (
        <div>
          {journalEntries.map((entry, index) => (
            <div key={index} style={{ display: 'flex', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <img src={entry.image} alt="Journal Image" style={{ maxWidth: '100%' }} />
              </div>
              <div style={{ flex: 2, marginLeft: '10px' }}>
                <p>{entry.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No journal entries yet.</p>
      )}
    </div>
  );
};

export default WeeklyJournal;
