import React, { useState, useEffect } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { useStore } from './app/store/store';
import TranslateApp from './features/translateApp';
import Pagination from './app/layout/Pagination';

const ITEMS_PER_PAGE = 5;

const App: React.FC = observer(() => {
  const { translateStore } = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDeleteItem = (index: number) => {
    translateStore.deleteItemFromHistory(index);
  };

  const handleDeleteAll = () => {
    translateStore.deleteAllHistory();
  };

  useEffect(() => {
    translateStore.loadHistoryFromLocalStorage();
  }, [translateStore]);

  // Get current page of translation history
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentHistoryPage = translateStore.translationHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change current page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TranslateApp />
        <div className="translation-history">
          <h2>Translation History</h2>
          {currentHistoryPage.length > 0 ? (
            <>
              <button onClick={handleDeleteAll} className="delete-all-btn">
                Delete All History
              </button>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>From</th>
                    <th>Original Text</th>
                    <th>Translated Text</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentHistoryPage.map((item, index) => (
                    <tr key={index}>
                      <td>{item.from}</td>
                      <td>{item.originalText}</td>
                      <td>{item.translatedText}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteItem(indexOfFirstItem + index)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                totalItems={translateStore.translationHistory.length}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <p>No translation history available.</p>
          )}
        </div>
      </header>
    </div>
  );
});

export default App;
