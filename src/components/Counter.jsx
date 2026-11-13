
import { useState, useEffect, useCallback } from 'react'

export default function Counter() {
  // 1. Restore counter value from localStorage
  const [count, setCount] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_valeur')
    const valeur = sauvegarde !== null ? parseInt(sauvegarde, 10) : 0

    return Math.max(-50, Math.min(50, valeur))
  })

  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('Aucun clic pour le moment')
  const [totalClics, setTotalClics] = useState(0)

  // 2. Restore history from localStorage
  const [historique, setHistorique] = useState(() => {
    const sauvegarde = localStorage.getItem('mon_compteur_historique')
    return sauvegarde !== null ? JSON.parse(sauvegarde) : []
  })

  // 3. Synchronize browser tab title
  useEffect(() => {
    document.title = 'Compteur : ' + count
  }, [count])

  // 4. Save counter value
  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString())
  }, [count])

  // 5. Save history
  useEffect(() => {
    localStorage.setItem(
      'mon_compteur_historique',
      JSON.stringify(historique)
    )
  }, [historique])

  // 6. Increment with maximum limit
  const handleIncrement = () => {
    const nouveauCompte = count + step

    if (nouveauCompte > 50) {
      setMessage('Seuil maximal de 50 atteint !')
      return
    }

    setCount(nouveauCompte)
    setMessage('Ajout de ' + step)
    setTotalClics(totalClics + 1)

    const action = '+' + step
    setHistorique([...historique, action])
  }

  // 7. Decrement with minimum limit
  const handleDecrement = () => {
    const nouveauCompte = count - step

    if (nouveauCompte < -50) {
      setMessage('Seuil minimal de -50 atteint !')
      return
    }

    setCount(nouveauCompte)
    setMessage('Retrait de ' + step)
    setTotalClics(totalClics + 1)

    const action = '-' + step
    setHistorique([...historique, action])
  }

  // 8. Keyboard controls with useEffect
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        handleIncrement()
      }

      if (e.key === 'ArrowDown') {
        handleDecrement()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    // Cleanup: remove the keyboard event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleIncrement, handleDecrement])

  // 9. Reset counter and history
  const handleReset = () => {
    setCount(0)
    setMessage('Remise a zero')
    setTotalClics(totalClics + 1)
    setHistorique([])
  }

  // 10. Counter color
  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive'
    if (count < 0) return 'counter-display negative'
    return 'counter-display zero'
  }

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>

      <div className="btn-group">
        <button className="btn btn-dec" onClick={handleDecrement}>
          -{step}
        </button>

        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>

        <button className="btn btn-inc" onClick={handleIncrement}>
          +{step}
        </button>
      </div>

      <div className="step-control">
        <label>Pas d'incrementation :</label>
        <select
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="history-card">
        <p>
          <strong>Derniere action :</strong> {message}
        </p>

        <p>
          <strong>Total des clics :</strong> {totalClics}
        </p>

        {historique.length > 0 && (
          <p>
            <strong>Historique :</strong> {historique.join(', ')}
          </p>
        )}
      </div>

      <p>
        <strong>Clavier :</strong> ↑ pour incrémenter | ↓ pour décrémenter
      </p>
    </div>
  )
}
