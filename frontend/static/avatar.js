let scene, camera, renderer, avatarMesh;

function initAvatar() {
    const container = document.getElementById("avatar-container");
    if (!container) return;
    
    // Set up Scene
    scene = new THREE.Scene();
    
    // Set up Camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(50, aspect, 0.1, 1000);
    camera.position.z = 4.5;
    
    // Set up Renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x22d3ee, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const helperLight = new THREE.PointLight(0xffffff, 0.8, 100);
    helperLight.position.set(-5, 5, 5);
    scene.add(helperLight);
    
    // Geometry (Icosahedron looks futuristic)
    const geometry = new THREE.IcosahedronGeometry(1.2, 0);
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4, // Cyan
        metalness: 0.7,
        roughness: 0.2,
        transparent: true,
        opacity: 0.9,
        wireframe: true,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.2
    });
    
    avatarMesh = new THREE.Mesh(geometry, material);
    scene.add(avatarMesh);
    
    // Add inner solid core
    const coreGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x1e293b,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    avatarMesh.add(coreMesh);
    
    // Handle resize
    window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    
    if (avatarMesh) {
        avatarMesh.rotation.y += 0.005;
        avatarMesh.rotation.x += 0.002;
    }
    
    renderer.render(scene, camera);
}

// Hook that can be called by app.js when an action occurs
window.triggerAvatarAction = (success) => {
    if (!avatarMesh) return;
    
    // Flash color based on success
    const targetColor = success ? new THREE.Color(0x22c55e) : new THREE.Color(0xef4444); // Green / Red
    const originalColor = new THREE.Color(0x06b6d4); // Cyan
    
    // GSAP Animation overriding Three.js Mesh
    gsap.to(avatarMesh.material.color, {
        r: targetColor.r,
        g: targetColor.g,
        b: targetColor.b,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            avatarMesh.material.color.copy(originalColor);
        }
    });

    // Spin burst animation
    gsap.to(avatarMesh.rotation, {
        y: avatarMesh.rotation.y + Math.PI,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
};

document.addEventListener("DOMContentLoaded", initAvatar);
