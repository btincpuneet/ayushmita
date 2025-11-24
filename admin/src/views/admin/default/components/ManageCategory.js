import React, { useState, useEffect } from 'react';
import { Box, SimpleGrid, Text, Button, Input, FormControl, Checkbox, Image, Link } from '@chakra-ui/react';
import noimg from 'assets/img/avatars/avatar4.png';
import DashboardHeader from './DashboardHeader';
import API_BASE from 'config/api';

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedToRemove, setSelectedToRemove] = useState([]);
  const [filter, setFilter] = useState('all');
  const [form, setForm] = useState({ name: '', description: '', image: '', url: '', is_include_top_nav: false, status: 'active' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/categories`);
      const data = await res.json();
      setCategories(data);
      if (data.length > 0) setSelectedId(data[0].id);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const selectedCategory = categories.find(c => c.id === selectedId);

  const handleRowClick = (id) => setSelectedId(id);

  const handleAddClick = () => {
    setIsAdding(true); setIsEditing(false); setForm({ name: '', description: '', image: '', url: '', is_include_top_nav: false, status: 'active' });
  };
  const handleCancelAdd = () => setIsAdding(false);

  const handleEditClick = (id) => {
    const cat = categories.find(c => c.id === id);
    if (!cat) return;
    setIsAdding(true); setIsEditing(true); setEditingId(id);
    setForm({ name: cat.name || '', description: cat.description || '', image: cat.image || '', url: cat.url || '', is_include_top_nav: !!cat.is_include_top_nav, status: cat.status || 'active' });
  };

  const handleSave = async () => {
    try {
      if (isEditing && editingId) {
        await fetch(`${API_BASE}/api/categories/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...form } : c));
      } else {
        const res = await fetch(`${API_BASE}/api/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        const result = await res.json();
        if (result && result.category) {
          setCategories(prev => [...prev, result.category]);
        } else {
          // if API returns created resource directly
          fetchCategories();
        }
      }
      setIsAdding(false); setIsEditing(false); setEditingId(null); setForm({ name: '', description: '', image: '', url: '', is_include_top_nav: false, status: 'active' });
    } catch (err) {
      console.error('Save category failed', err);
    }
  };

  const handleRemoveClick = () => { setIsRemoving(true); setSelectedToRemove([]); };

  const handleCheckbox = (id) => {
    setSelectedToRemove(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleConfirmRemove = async () => {
    const confirmed = window.confirm('Delete selected categories?');
    if (!confirmed) return;
    try {
      const promises = selectedToRemove.map(id => fetch(`${API_BASE}/api/categories/${id}`, { method: 'DELETE' }));
      const results = await Promise.all(promises);
      const failed = results.filter(r => !r.ok);
      if (failed.length) console.error('Some deletions failed', failed);
      setCategories(prev => prev.filter(c => !selectedToRemove.includes(c.id)));
      setIsRemoving(false); setSelectedToRemove([]);
      if (categories.length > 0) setSelectedId(categories[0].id);
    } catch (err) {
      console.error('Failed to delete categories', err);
    }
  };

  const filtered = categories.filter(c => filter === 'all' ? true : (filter === 'active' ? c.status === 'active' : c.status !== 'active'));

  return (
    <Box mt={-7} ml={-5} p={0} mr={0} bg="#eef2f6" minH="100vh">
      <DashboardHeader pageName="Manage Category" />

      <SimpleGrid gridTemplateColumns="60% 39%" spacing={4} mt={-40} mb={0} mr={-4} ml={2} textAlign="left">
        <Box bg="white" boxShadow="md" borderRadius="lg" p={6} marginBottom="7" w="100%">
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
              <Button mr='15px' onClick={() => setFilter('active')}>Active</Button>
              <Button onClick={() => setFilter('deactivated')}>Deactivated</Button>
            </Box>
            <Box>
              {!isRemoving ? (
                <>
                  <Button bg="#682EF3" color="#ffffff" marginRight="10px" onClick={handleAddClick}>Add Category</Button>
                  <Button bg="#F13130" color="#ffffff" onClick={handleRemoveClick}>Remove Category</Button>
                </>
              ) : (
                <>
                  <Button bg="#F13130" color="#ffffff" marginRight="10px" onClick={handleConfirmRemove}>Confirm</Button>
                  <Button bg="#682EF3" color="#ffffff" onClick={() => setIsRemoving(false)}>Cancel</Button>
                </>
              )}
            </Box>
          </Box>

          <ul style={{ display: 'grid', gridTemplateColumns: '30% 30% 20% 20%', fontWeight: 'bold', height: '40px', marginLeft: '-12px', paddingLeft: '12px',  paddingTop: '6px', listStyle: 'none'  }}>
            <li>Name</li> 
            <li>Description</li>
            <li>Status</li>
            <li>Action</li>
          </ul>

          {filtered.map(cat => (
            <ul key={cat.id} onClick={() => handleRowClick(cat.id)} className={`lift-row ${cat.id === selectedId ? 'selected' : ''}`} style={{ display: 'grid', gridTemplateColumns: '30% 30% 20% 20%', cursor: 'pointer', height: '50px', listStyle: 'none'  }}>
              <li style={{ paddingLeft: 0, textAlign: 'left', paddingTop: '3px' }}>{cat.name}</li>
              <li style={{ paddingLeft: 0, textAlign: 'left', paddingTop: '3px' }}>{cat.description}</li>
              <li style={{ paddingLeft: 0, textAlign: 'left', paddingTop: '3px' }}>{cat.status}</li>
              <li style={{ paddingLeft: 0, textAlign: 'left', paddingTop: '3px' }}>
                <Button color="#ffffff" bg="#632EEE" height="30px" onClick={(e) => { e.stopPropagation(); handleEditClick(cat.id); }}>Edit</Button>
              </li>
            </ul>
          ))}
        </Box>

        <SimpleGrid columns={1} spacing={4} mb={0}>
          <Box bg="white" boxShadow="md" borderRadius="lg" p={6} mb={4}>
            {!isRemoving ? (
              <>
                <Button bg="#682EF3" color="#ffffff" marginRight="10px" onClick={handleAddClick}>Add Category</Button>
                <Button bg="#F13130" color="#ffffff" onClick={handleRemoveClick}>Remove Category</Button>
              </>
            ) : (
              <>
                <Button bg="#F13130" color="#ffffff" marginRight="10px" onClick={handleConfirmRemove}>Confirm</Button>
                <Button bg="#682EF3" color="#ffffff" onClick={() => setIsRemoving(false)}>Cancel</Button>
              </>
            )}

            <SimpleGrid columns={1} spacing={0} mb={0} id='addCategoryRemoveCategory'>
              {!isAdding && !isRemoving ? (
                <>
                  {selectedCategory && (
                    <>
                      
                       </>
                  )}
                </>
              ) : isAdding ? (
                <SimpleGrid columns={1}>
                  <Text className="callsHeaderTitle" fontSize="lg" mb={4} fontWeight="bold" width="100%" mt="20px" pl="10px">{isEditing ? 'Edit Category' : 'Add New Category'}</Text>
                  <FormControl mb={4}>
                    <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </FormControl>
                  <FormControl mb={4}>
                    <Input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </FormControl>
                  <FormControl mb={4}>
                    <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                  </FormControl>
                  <FormControl mb={4}>
                    <Input placeholder="URL" value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
                  </FormControl>
                  <FormControl mb={4}>
                    <Checkbox isChecked={form.is_include_top_nav} onChange={(e) => setForm({ ...form, is_include_top_nav: e.target.checked })}>Include in top nav</Checkbox>
                  </FormControl>
                  <SimpleGrid columns={2}>
                    <Box width="100%"><Button bg="#682EF3" color="#ffffff" mr={4} onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</Button></Box>
                    <Box width="100%"><Button bg="#F13130" color="#ffffff" onClick={() => { setIsAdding(false); setIsEditing(false); }}>Cancel</Button></Box>
                  </SimpleGrid>
                </SimpleGrid>
              ) : (
                <>
                  <Text className="callsHeaderTitle" fontSize="lg" mb={4} fontWeight="bold" pl="10px">Select Categories to remove</Text>
                  {categories.map((cat, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={2}>
                      <Checkbox onChange={() => handleCheckbox(cat.id)} isChecked={selectedToRemove.includes(cat.id)} />
                      <Text ml={2}>{cat.name}</Text>
                    </Box>
                  ))}
                </>
              )}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
};

export default ManageCategory;
