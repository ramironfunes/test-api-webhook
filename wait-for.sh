#!/bin/bash
# Script para esperar a que un host:puerto esté disponible antes de arrancar

hostport="$1"
shift

until nc -z $(echo $hostport | cut -d: -f1) $(echo $hostport | cut -d: -f2); do
  echo "⏳ Esperando a $hostport..."
  sleep 2
done

echo "✅ $hostport está disponible, arrancando aplicación..."
exec "$@"
