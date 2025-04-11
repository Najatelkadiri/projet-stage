import { useEffect, useState } from 'react';

const Vente = () => {
  const [ventes, setVentes] = useState([]);
  const [newVente, setNewVente] = useState({
    zone: '',
    lot: '',
    niveau: '',
    ntf: '',
    acheteur: '',
    date: '',
    situation: '',
    superficie: '',
    puD: '',
    puB: '',
    puVente: '',
    prixTotalD: '',
    prixTotalB: '',
    prixTotal: '',
    totalAprAvances: '',
    statut: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedVentes = ventes.map((vente, index) =>
        index === editingIndex ? newVente : vente
      );
      setVentes(updatedVentes);
      setEditingIndex(null);
    } else {
      setVentes([...ventes, newVente]);
    }
    setNewVente({
      zone: '',
      lot: '',
      niveau: '',
      ntf: '',
      acheteur: '',
      date: '',
      situation: '',
      superficie: '',
      puD: '',
      puB: '',
      puVente: '',
      prixTotalD: '',
      prixTotalB: '',
      prixTotal: '',
      totalAprAvances: '',
      statut: ''
    });
  };

  const handleDelete = (index) => {
    const updatedVentes = ventes.filter((vente, venteIndex) => venteIndex !== index);
    setVentes(updatedVentes);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVente({
      ...newVente,
      [name]: value,
    });
  };

  const handleEdit = (index) => {
    const venteToEdit = ventes[index];
    setNewVente({ ...venteToEdit });
    setEditingIndex(index);
  };

  useEffect(() => {
    fetch('/vente')
      .then(response => response.json())
      .then(data => setVentes(data.content))
      .catch(error => console.error('Erreur de chargement des ventes:', error));
  }, []);

  const styles = {
    container: {
      padding: '20px',
      maxWidth: '600px',
      margin: '30px auto',
      border: '1px solid #ccc',
      borderRadius: '12px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    input: {
      width: '100%',
      padding: '8px',
      marginBottom: '10px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '14px'
    },
    label: {
      fontWeight: 'bold',
      display: 'block',
      marginBottom: '4px'
    },
    button: {
      padding: '10px 20px',
      marginRight: '10px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer'
    },
    table: {
      width: '95%',
      margin: '30px auto',
      borderCollapse: 'collapse',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    th: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '8px'
    },
    td: {
      padding: '8px',
      textAlign: 'center',
      borderBottom: '1px solid #ddd'
    },
    actionButtons: {
      display: 'flex',
      gap: '6px',
      justifyContent: 'center'
    }
  };

  return (
    <>
      <form onSubmit={handleAdd} style={styles.container}>
        <h2 style={{ textAlign: 'center' }}>{editingIndex !== null ? 'Modifier une Vente' : 'Ajouter une Vente'}</h2>

        {Object.keys(newVente).map((key) => (
          <div style={{ marginBottom: '10px' }} key={key}>
            <label style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === 'date' ? 'date' : key.includes('prix') || key.includes('pu') || key === 'superficie' || key === 'totalAprAvances' ? 'number' : 'text'}
              name={key}
              value={newVente[key]}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>
        ))}

        <button style={styles.button} type="submit">{editingIndex !== null ? 'Mettre à jour' : 'Ajouter'}</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Actions</th>
            {Object.keys(newVente).map((key) => (
              <th key={key} style={styles.th}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente, index) => (
            <tr key={index}>
              <td style={styles.td}>
                <div style={styles.actionButtons}>
                  <button onClick={() => handleEdit(index)}>✏</button>
                  <button onClick={() => handleDelete(index)}>🗑</button>
                </div>
              </td>
              {Object.keys(newVente).map((key) => (
                <td key={key} style={styles.td}>
                  {key === 'date'
                    ? new Date(vente[key]).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                    : vente[key]?.value || vente[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Vente;
