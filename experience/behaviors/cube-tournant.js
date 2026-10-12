/** @type {import('../../core/behaviors').Behavior} */
export default {
  onFound(ctx) {
    if (!ctx.state.cube) {
      // Cube de 20 % de la largeur de l'affiche (1 unité = largeur de l'affiche)
      const geometry = new ctx.THREE.BoxGeometry(0.2, 0.2, 0.2)
      const material = new ctx.THREE.MeshStandardMaterial({
        color: 0x22cc44,
        roughness: 0.3,
        metalness: 0.1,
      })
      const cube = new ctx.THREE.Mesh(geometry, material)

      // Position : centre de l'affiche (0.5, 0.5), décollé de 0.15 vers le spectateur
      const position = ctx.toLocal(0.5, 0.5, 0.15)
      cube.position.copy(position)

      ctx.state.cube = cube
    }

    if (ctx.state.cube.parent !== ctx.poster) {
      ctx.poster.add(ctx.state.cube)
    }
    ctx.state.cube.visible = true
  },

  onLost(ctx) {
    if (ctx.state.cube) {
      ctx.state.cube.visible = false
    }
  },

  onUpdate(ctx, t, dt) {
    if (ctx.state.cube && ctx.state.cube.visible) {
      // Rotation lente sur lui-même
      ctx.state.cube.rotation.x += dt * 0.8
      ctx.state.cube.rotation.y += dt * 1.2
    }
  },
}
