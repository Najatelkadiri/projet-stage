import { useEffect, useState } from 'react';

const Vente = () => {
  const [ventes, setVentes] = useState([]);
  const [editingVente, setEditingVente] = useState(null);
  const [newVente, setNewVente] = useState({
    id: null,
    lot: '',
    ntf: '',
    acheteur: '',
    superficie: '',
    puD: '',
    puB: '',
    puVente: '',
    prixTotalD: '',
    prixTotalB: '',
    prixTotal: '',
    totalAprAvances: '',
    date: '',
    zone: { value: '' },
    niveau: { value: '' },
    situation: { value: '' },
    statut: { value: '' }
  });

  const fetchVentes = () => {
    fetch('http://demo9780723.mockable.io/vente')
      .then(response => response.json())
      .then(data => setVentes(data.content))
      .catch(error => console.error('Erreur de chargement des ventes:', error));
  };

  useEffect(() => {
    fetchVentes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setNewVente(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setNewVente(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = () => {
    if (editingVente) {
      setVentes(prev => prev.map(v => (v.id === editingVente ? newVente : v)));
      setEditingVente(null);
    } else {
      const id = Math.floor(Math.random() * 100000);
      setVentes(prev => [...prev, { ...newVente, id }]);
    }
    setNewVente({
      id: null,
      lot: '',
      ntf: '',
      acheteur: '',
      superficie: '',
      puD: '',
      puB: '',
      puVente: '',
      prixTotalD: '',
      prixTotalB: '',
      prixTotal: '',
      totalAprAvances: '',
      date: '',
      zone: { value: '' },
      niveau: { value: '' },
      situation: { value: '' },
      statut: { value: '' }
    });
  };

  const handleEdit = (vente) => {
    setEditingVente(vente.id);
    setNewVente(vente);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cette vente ?")) {
      setVentes(prev => prev.filter(v => v.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Gestion des ventes</h2>

      {/* Formulaire d'ajout / modification */}
      <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
        <h4>{editingVente ? 'Modifier Vente' : 'Ajouter Vente'}</h4>
        <input name="lot" placeholder="Lot" value={newVente.lot} onChange={handleInputChange} />
        <input name="ntf" placeholder="NTF" value={newVente.ntf} onChange={handleInputChange} />
        <input name="acheteur" placeholder="Acheteur" value={newVente.acheteur} onChange={handleInputChange} />
        <input name="superficie" placeholder="Superficie" value={newVente.superficie} onChange={handleInputChange} />
        <input name="puD" placeholder="Pu D" value={newVente.puD} onChange={handleInputChange} />
        <input name="puB" placeholder="Pu B" value={newVente.puB} onChange={handleInputChange} />
        <input name="puVente" placeholder="Pu Vente" value={newVente.puVente} onChange={handleInputChange} />
        <input name="prixTotalD" placeholder="Prix Total D" value={newVente.prixTotalD} onChange={handleInputChange} />
        <input name="prixTotalB" placeholder="Prix Total B" value={newVente.prixTotalB} onChange={handleInputChange} />
        <input name="prixTotal" placeholder="Prix Total" value={newVente.prixTotal} onChange={handleInputChange} />
        <input name="totalAprAvances" placeholder="Total Apr" value={newVente.totalAprAvances} onChange={handleInputChange} />
        <input name="date" placeholder="Date" type="date" value={newVente.date} onChange={handleInputChange} />
        <input name="zone.value" placeholder="Zone" value={newVente.zone?.value} onChange={handleInputChange} />
        <input name="niveau.value" placeholder="Niveau" value={newVente.niveau?.value} onChange={handleInputChange} />
        <input name="situation.value" placeholder="Situation" value={newVente.situation?.value} onChange={handleInputChange} />
        <input name="statut.value" placeholder="Statut" value={newVente.statut?.value} onChange={handleInputChange} />
        <button onClick={handleSubmit} style={{ marginLeft: '10px' }}>
          {editingVente ? 'Enregistrer' : 'Ajouter'}
        </button>
      </div>

      {/* Boutons recharge & suppression */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={fetchVentes} style={{ marginRight: '10px' }}>🔄 Recharger</button>
        <button onClick={() => setVentes([])} style={{ backgroundColor: 'darkred', color: 'white' }}>🗑️ Supprimer tout</button>
      </div>

      {/* Tableau */}
      <table border="1" cellPadding="6" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead style={{ backgroundColor: '#eee' }}>
          <tr>
            <th>Zone</th><th>Lot</th><th>Niveau</th><th>Ntf</th><th>Acheteur</th><th>Date</th><th>Situation</th><th>Superficie</th>
            <th>Pu D</th><th>Pu B</th><th>Pu Vente</th><th>Prix Total D</th><th>Prix Total B</th><th>Prix Total</th><th>Total Apr</th><th>Statut</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ventes.map((vente) => (
            <tr key={vente.id}>
              <td>{vente.zone?.value}</td>
              <td>{vente.lot}</td>
              <td>{vente.niveau?.value}</td>
              <td>{vente.ntf}</td>
              <td>{vente.acheteur}</td>
              <td>{new Date(vente.date).toLocaleDateString()}</td>
              <td>{vente.situation?.value}</td>
              <td>{vente.superficie}</td>
              <td>{vente.puD}</td>
              <td>{vente.puB}</td>
              <td>{vente.puVente}</td>
              <td>{vente.prixTotalD}</td>
              <td>{vente.prixTotalB}</td>
              <td>{vente.prixTotal}</td>
              <td>{vente.totalAprAvances}</td>
              <td>{vente.statut?.value}</td>
              <td>
                <button onClick={() => handleEdit(vente)} style={{ marginRight: '5px' }}>✏️</button>
                <button onClick={() => handleDelete(vente.id)} style={{ color: 'white', backgroundColor: 'red', border: 'none' }}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vente;
