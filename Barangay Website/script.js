// Layer data and configurations
        const layerData = {
            dangerZone: {
                name: 'Danger Zones',
                icon: '⚠️',
                legend: [
                    { color: 'blue', label: 'Flood Prone Areas', count: '5 areas' },
                    { color: 'yellow', label: 'Moderate Landslide Areas', count: '2 areas' },
                    { color: 'red', label: 'High Landslide Areas', count: '1 areas' }
                ],
                stats: [
                    // { label: 'High Risk Population 🚨', value: '342' },
                    { label: 'Danger Zone Areas 🏔️', value: '8' },
                    // { label: 'Emergency Shelters 🏠', value: '8' },
                    // { label: 'Warning Systems 📢', value: '15' },
                    // { label: 'Access Roads 🛤️', value: '12' },
                    // { label: 'Affected Buildings 🏢', value: '89' },
                    { label: 'Risk Assessment Level 📊', value: 'Moderate to High' }
                ]
            },
            safeZone: {
                name: 'Safe Zones',
                icon: '🛡️',
                legend: [
                    // { color: '#16a34a', label: 'Evacuation Centers', count: '12 centers' },
                    { color: '#39FF14', label: 'Safe Assembly Points', count: '2 areas' },
                    // { color: '#4ade80', label: 'Emergency Routes', count: '15 routes' }
                ],
                stats: [
                    { label: 'Safe Zone Population 🛡️', value: '405' },
                    // { label: 'Evacuation Centers 🏥', value: '12' },
                    // { label: 'Safe Assembly Points 📍', value: '28' },
                    // { label: 'Emergency Routes 🛣️', value: '15' },
                    // { label: 'Medical Facilities 🏥', value: '6' },
                    // { label: 'Safe Buildings 🏗️', value: '267' },
                    { label: 'Safety Rating 🌟', value: '28.57%' }
                ]
            },
            greenZone: {
                name: 'Green Zones',
                icon: '🌿',
                legend: [
                    { color: '#15803d', label: 'Forest Areas', count: '5 areas' },
                    // { color: '#16a34a', label: 'Agricultural Land', count: '45 hectares' },
                    // { color: '#22c55e', label: 'Parks & Recreation', count: '18 areas' }
                ],
                stats: [
                    { label: 'Green Coverage 🌱', value: '71%' },
                    // { label: 'Forest Areas 🌲', value: '8' },
                    // { label: 'Agricultural Land 🌾', value: '45 ha' },
                    // { label: 'Parks & Recreation 🏞️', value: '18' },
                    // { label: 'Tree Population 🌳', value: '2,847' },
                    // { label: 'Carbon Sequestration 💨', value: '12.5t' },
                    // { label: 'Biodiversity Index 🦋', value: 'High' }
                ]
            },
            purok: {
                name: 'Purok Boundaries',
                icon: '🏘️',
                legend: [
                    { color: 'red', label: 'Purok Mangga', count: '143 population' },
                    { color: 'yellow', label: 'Purok Caimito', count: '262 population' },
                    { color: 'white', label: 'Purok Balimbing', count: '138 population' },
                    { color: '#FF69B4', label: 'Purok Sambag', count: '217 population' },
                    { color: '#FFAE42', label: 'Purok Bayabas', count: '332 population' },
                    { color: '#39FF14', label: 'Purok Santol', count: '211 population' },
                    { color: '#FF7400', label: 'Purok Nangka', count: '223 population' }
                ],
                stats: [
                    { label: 'Total Puroks 🏘️', value: '7' },
                    { label: 'Average Population per Purok 👥', value: '218' },
                    { label: 'Largest Purok Population 📊', value: '332' },
                    { label: 'Smallest Purok Population 📉', value: '138' },
                    // { label: 'Purok Leaders 👨‍💼', value: '13' },
                    // { label: 'Community Centers 🏢', value: '8' },
                    // { label: 'Coverage Area 📐', value: '100%' }
                ]
            }
        };

        // Default/general statistics
        const defaultStats = [
            { label: 'Total Population 🌍', value: '1,526' },
            { label: 'Total Households 🏘️', value: '286' },
            { label: 'Total Families 👨‍👩‍👧‍👦', value: '414' },
            { label: 'Professional Workers 👩‍💼', value: '258' },
            { label: 'Hard Laborers 👷', value: '265' },
            { label: 'Number of Buildings 🏫', value: '356' },
            { label: 'Number of Puroks 🏘️', value: '13' }
        ];

        // State management
        let activeLayers = new Set();

        // DOM elements
        const layerToggles = document.querySelectorAll('.layer-toggle');
        const showAllBtn = document.getElementById('showAllBtn');
        const hideAllBtn = document.getElementById('hideAllBtn');
        const legendContent = document.getElementById('legendContent');
        const legendTitle = document.getElementById('legendTitle');
        const legendIcon = document.getElementById('legendIcon');
        const statsContent = document.getElementById('statsContent');
        const statsTitle = document.getElementById('statsTitle');

        // Initialize event listeners
        function initializeEventListeners() {
            layerToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const layerName = toggle.dataset.layer;
                    toggleLayer(layerName);
                });
            });

            showAllBtn.addEventListener('click', showAllLayers);
            hideAllBtn.addEventListener('click', hideAllLayers);
        }

        // Toggle individual layer
        function toggleLayer(layerName) {
            const layerElement = document.getElementById(layerName + 'Layer');
            const checkboxElement = document.getElementById(layerName + 'Check');
            const toggleElement = document.querySelector(`[data-layer="${layerName}"]`);

            if (activeLayers.has(layerName)) {
                // Hide layer
                layerElement.classList.remove('visible');
                checkboxElement.classList.remove('checked');
                toggleElement.classList.remove('active');
                activeLayers.delete(layerName);
            } else {
                // Show layer
                layerElement.classList.add('visible');
                checkboxElement.classList.add('checked');
                toggleElement.classList.add('active');
                activeLayers.add(layerName);
            }

            updateSidebarContent();
            updateControlButtons();
        }

        // Show all layers
        function showAllLayers() {
            Object.keys(layerData).forEach(layerName => {
                const layerElement = document.getElementById(layerName + 'Layer');
                const checkboxElement = document.getElementById(layerName + 'Check');
                const toggleElement = document.querySelector(`[data-layer="${layerName}"]`);

                layerElement.classList.add('visible');
                checkboxElement.classList.add('checked');
                toggleElement.classList.add('active');
                activeLayers.add(layerName);
            });

            updateSidebarContent();
            updateControlButtons();
        }

        // Hide all layers
        function hideAllLayers() {
            Object.keys(layerData).forEach(layerName => {
                const layerElement = document.getElementById(layerName + 'Layer');
                const checkboxElement = document.getElementById(layerName + 'Check');
                const toggleElement = document.querySelector(`[data-layer="${layerName}"]`);

                layerElement.classList.remove('visible');
                checkboxElement.classList.remove('checked');
                toggleElement.classList.remove('active');
            });

            activeLayers.clear();
            updateSidebarContent();
            updateControlButtons();
        }

        // Update control buttons state
        function updateControlButtons() {
            const totalLayers = Object.keys(layerData).length;
            
            if (activeLayers.size === totalLayers) {
                showAllBtn.classList.remove('active');
                hideAllBtn.classList.add('active');
            } else if (activeLayers.size === 0) {
                showAllBtn.classList.add('active');
                hideAllBtn.classList.remove('active');
            } else {
                showAllBtn.classList.remove('active');
                hideAllBtn.classList.remove('active');
            }
        }

        // Update sidebar content based on active layers
        function updateSidebarContent() {
            if (activeLayers.size === 0) {
                // Show default content with message
                showDefaultContent();
            } else if (activeLayers.size === 1) {
                // Show specific layer content
                const activeLayer = Array.from(activeLayers)[0];
                showLayerContent(activeLayer);
            } else {
                // Show all legends when multiple layers are active
                showDefaultContent();
            }
        }

        // Show default content
        function showDefaultContent() {
            legendTitle.textContent = 'Layer Legend';
            legendIcon.textContent = '🗂️';
            
            if (activeLayers.size === 0) {
                legendContent.innerHTML = '<div class="no-layers-message">Select a layer to view its legend</div>';
            } else if (activeLayers.size > 1) {
                // Show all legends when multiple layers are active
                showAllLegends();
            }
            
            statsTitle.textContent = 'Barangay Statistics';
            updateStatsContent(defaultStats);
        }

        // Show all legends when multiple layers are active
        function showAllLegends() {
            legendTitle.textContent = 'All Layers Legend';
            legendIcon.textContent = '🗂️';
            
            let legendHTML = '';
            activeLayers.forEach(layerName => {
                const layer = layerData[layerName];
                legendHTML += `
                    <div style="margin-bottom: 20px;">
                        <h4 style="color: #374151; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <span>${layer.icon}</span>
                            <span>${layer.name}</span>
                        </h4>
                `;
                
                layer.legend.forEach(item => {
                    legendHTML += `
                        <div class="legend-item" style="margin-left: 20px; margin-bottom: 8px;">
                            <div class="legend-color" style="background-color: ${item.color}"></div>
                            <span class="legend-label">${item.label}</span>
                            <span class="legend-count">${item.count}</span>
                        </div>
                    `;
                });
                
                legendHTML += '</div>';
            });
            
            legendContent.innerHTML = legendHTML;
        }

        // Show specific layer content
        function showLayerContent(layerName) {
            const layer = layerData[layerName];
            
            // Update legend
            legendTitle.textContent = layer.name + ' Legend';
            legendIcon.textContent = layer.icon;
            
            let legendHTML = '';
            layer.legend.forEach(item => {
                legendHTML += `
                    <div class="legend-item">
                        <div class="legend-color" style="background-color: ${item.color}"></div>
                        <span class="legend-label">${item.label}</span>
                        <span class="legend-count">${item.count}</span>
                    </div>
                `;
            });
            legendContent.innerHTML = legendHTML;
            
            // Update statistics
            statsTitle.textContent = layer.name + ' Statistics';
            updateStatsContent(layer.stats);
        }

        // Update statistics content
        function updateStatsContent(stats) {
            let statsHTML = '';
            stats.forEach(stat => {
                statsHTML += `
                    <div class="stat-item">
                        <span class="stat-label">${stat.label}</span>
                        <span class="stat-value">${stat.value}</span>
                    </div>
                `;
            });
            statsContent.innerHTML = statsHTML;
        }

        // Add smooth animations for layer transitions
        function addLayerAnimations() {
            const layerOverlays = document.querySelectorAll('.layer-overlay');
            layerOverlays.forEach(overlay => {
                overlay.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
            });
        }

        // Add hover effects for interactive elements
        function addHoverEffects() {
            const toggles = document.querySelectorAll('.layer-toggle');
            toggles.forEach(toggle => {
                toggle.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                });
                
                toggle.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // Initialize the application
        function initializeApp() {
            initializeEventListeners();
            addLayerAnimations();
            addHoverEffects();
            updateControlButtons();
            
            // Set initial state
            showDefaultContent();
            
            console.log('Barangay Interactive Map initialized successfully!');
        }

        // Start the application when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeApp);